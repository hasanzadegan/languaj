app.controller('AppCtrl', function ($rootScope, $scope, $http, $window, $ocLazyLoad, $path,
                                    StorageService,
                                    WordService,
                                    $label,
                                    $timeout,
                                    SoundService,
                                    LessonService,
                                    LevelService,
                                    BaeService,
                                    LoginService,
                                    $mdDialog,
                                    // ngAudio,
                                    $location,
                                    $q,
) {


    // change it for clear cache in clients

    var currentVersion = 1015;
    $rootScope.extraLetters = ["Ä", "Ö", "Ü", "ẞ"]//,"ä","ö","ü","ß"];
    $rootScope.selectedLang = {"langId": 2, "title": "german", "code": "de", "isSource": 0, "isDestination": 1};


    $scope.options = {
        language: 'en',
        // extraPlugins: 'imagebrowser',
        // filebrowserBrowseUrl: '/api/v1/ckeditor/files',
        // filebrowserUploadMethod:'form',
        // filebrowserImageUploadUrl: '/api/saveDoc',
        // filebrowserUploadUrl: '/api/v1/ckeditor/files',
        allowedContent: true,
        entities: false,
        uiColor: '#00cad1',
        toolbar: 'full',
        toolbar_full: [
            {name: 'document', items: ['NewPage', 'ExportPdf', 'Preview', 'Print',]},
            {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteFromWord', '-']},
            {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike',]},
            {
                name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', '/',
                    'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
            },
            '/',
            {name: 'insert', items: ['Image', 'Table', 'Smiley', 'SpecialChar',]},
            {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
            {name: 'colors', items: ['TextColor', 'BGColor']},
            {name: 'tools', items: ['Maximize']},
        ]
    };
    $scope.onReady = function () {
        // ...
    };

    $scope.shuffle = function (array) {
        return array.sort(() => Math.random() - 0.5);
    }

    $scope.setPath = function (path) {
        StorageService.setPath('../' + path);
        $window.location.href = path;
    }

    $scope.clearData = function () {
        $scope.current = {};
        StorageService.clear();
    }

    $rootScope.logOut = function () {
        $scope.clearData();
        $window.location.href = "/auth/logout";
    }


    function DialogController($scope, $mdDialog, dataToPass) {
        $scope.mdDialogData = dataToPass;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    $rootScope.showDialog = function (dialogName, extraParam, ev) {
        $mdDialog.show({
            locals: {dataToPass: extraParam},
            controller: DialogController,
            templateUrl: 'html/dialog/' + dialogName + '.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(answer => {
                $scope.status = 'You said the information was "' + answer + '".';
            }, () => {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    $scope.footerList = [
        {name: 'settings', enabled: true, path: 'footerSettings'},
        // {name:'person',enabled:true,path:'footerProfile'},
        // {name: 'widgets', enabled: false, path: 'footerAchivment'},
        {name: 'school', enabled: true, path: 'footerLesson'},
        // {name: 'panorama', enabled: true, path: 'footerStudent'},
    ];

    BaeService.getLangList().then(function (data) {
        $scope.langList = data;
    })

    $rootScope.setIcon = function (icon) {
        $scope.config.footerIcon = icon.path;
        StorageService.setConfig($scope.config);
    }


    $scope.__path = location.protocol + '//' + location.host;

    $scope.current = StorageService.getData();


    if ($scope.current.version !== currentVersion) {
        $scope.clearData();
        $scope.current.version = currentVersion;
        StorageService.setData($scope.current);
    }


    try {
        courseCode = $window.location.search.split("?")[1].split("course=")[1].split("&")[0];
        refUserId = $window.location.search.split("&ref=")[1].split("&")[0];
        LessonService.addStudentCourse(courseCode, refUserId).then(result => {
            location.href = "/";
        });
    } catch (e) {

    }

    $scope.config = StorageService.getConfig();

    $scope.responsiveVoice = responsiveVoice;

    $scope.backToList = function () {
        $scope.config.footerIcon = "footerLesson";
        StorageService.setConfig($scope.config);
    }

    if (!$scope.config.footerIcon) {
        $scope.backToList();
    }

    $scope.goToSetting = function () {
        $scope.config.footerIcon = "footerSettings";
        StorageService.setConfig($scope.config);
    }

    $rootScope.store = function () {
        StorageService.setData($scope.current);
    }

    if (localStorage.getItem("__token")) {
        console.log("localStorage.getItem(__token)",localStorage.getItem("__token"));
        LoginService.checkJWT().then(result => {
            if (result.decoded === undefined)
                $window.location.href = $path.url + "/auth/google";
            else
                $scope.current.profile = result.decoded.user;
        })
    } else {
        LoginService.getProfile().then((result) => {

            if (result === "") {
                $window.location.href = $path.url + "/auth/google";
            } else {
                localStorage.setItem("__token", result.token);
                $scope.current.profile = result;
                StorageService.setData($scope.current);
            }
        });
    }


    $rootScope.replaceToken = function (title) {
        title = title.replace("{{Name}}", $scope.current.profile.firstName)
        title = title.replace("{{Name1}}", $scope.current.profile.firstName1)
        title = title.replace("{{Family}}", $scope.current.profile.lastName)
        title = title.replace("{{Family1}}", $scope.current.profile.lastName1)
        return title;
    }

    $scope.$on('levelChanged', function (event, levelId) {
        if (levelId !== null) {
            $scope.current.selectedLevelId = levelId;
            LessonService.getLevelById(levelId).then(levelResult => {
                var level = levelResult[0];
                $scope.current.selectedLevel = level;
                $rootScope.viewerData = level;

                path = level.levelTypeTitle.split(" ")[0].toLowerCase();

                LevelService.getLevelLexicalPhraseList(levelId).then(result => {
                    $scope.levelItemList = [];
                    $rootScope.viewerData.levelLexicalPhraseList = [];
                    for (item of result) {
                        try {
                            item.itemJSONObj = JSON.parse(item.itemJSON);
                            //replace token for viewer
                            item.itemJSONObj.title = $rootScope.replaceToken(item.itemJSONObj.title);
                            item.itemJSONObj.lexicalPhrase.title = $rootScope.replaceToken(item.itemJSONObj.lexicalPhrase.title);
                        } catch (e) {
                        }
                        $rootScope.viewerData.levelLexicalPhraseList.push(item);


                        if (!item.itemJSONObj.lexicalPhrase)
                            item.itemJSONObj.lexicalPhrase = {title: ''};

                        $scope.current.selectedLevelId = levelId;
                        StorageService.setData($scope.current)

                        //pair
                        $scope.levelItemList.push({
                            lexicalId: item.lexicalId,
                            title: item.title,
                            soundId: item.itemJSONObj.soundId
                        });
                        $scope.levelItemList.push({
                            lexicalId: item.lexicalId,
                            title: item.itemJSONObj.lexicalPhrase.title
                        });
                    }


                    //pair
                    $scope.shuffleList = $scope.shuffle($scope.levelItemList)

                    $rootScope.setLevelTypePath(path);
                    $rootScope.setViewerPath(path);
                    $rootScope.$broadcast('levelChangedWithDetail', $rootScope.viewerData.levelId)
                })

                StorageService.setData($scope.current);
            })

        }

        $scope.config.showPartConfig = {};
    });


    $scope.showAchievement = function () {
        // console.log("showAchiveMent");
        $scope.current.viewer = 'html/viewer/achievement.html';
    }


    $scope.selectStudentLevel = function (levelId) {
        // console.log(levelId)
        $rootScope.$broadcast('levelChanged', levelId);
        $scope.config.showLevel = true;
        StorageService.setConfig($scope.config);
    }


    $scope.$on("nextLevel", function (event, data) {
        levelList = $scope.current.student.selectedCourse.selectedTopic.levelList;
        levelIndex = $scope.current.student.selectedCourse.selectedTopic.levelIndex;
        levelIndex = levelIndex + 1;
        $scope.current.student.selectedCourse.selectedTopic.levelIndex = levelIndex;

        if (levelIndex > levelList.length - 1) {
            $scope.showAchievement();
        } else {
            nextLevel = levelList[levelIndex];
            $scope.selectStudentLevel(nextLevel.levelId);
            StorageService.setData($scope.current);
        }
    })

    if ($scope.current.selectedLevelId !== undefined)
        $rootScope.$broadcast('levelChanged', $scope.current.selectedLevelId);


    $scope.saveStorage = function () {
        StorageService.setData($scope.current)
    }

    $scope.filterReset = function () {
        $scope.current.filter = {"grayScale": 0, "contrast": 100, "brightness": 100, "hue": 0};
    }
    $scope.filterReset();

    $rootScope.setPropertyPage = function (path) {
        $scope.current.mainFlex = 35;
        $scope.current.propertyPage = 'html/property/' + path + '.html'
        // console.log("path", $scope.current.propertyPage)
        StorageService.setData($scope.current);
    }

    $rootScope.setViewerPage = function (path) {
        $scope.current.mainFlex = 35;
        $scope.current.viwerPage = 'html/viewer/' + path + '.html';
        StorageService.setData($scope.current);
        $rootScope.$broadcast('levelChanged', $scope.current.selectedLevelId);
    }

    $rootScope.hidePropertyPage = function () {
        $scope.current.mainFlex = 80;
        $scope.current.propertyPage = null;
        StorageService.setData($scope.current);
    }

    $rootScope.setLevelTypePath = function (levelType) {
        $scope.current.levelType = 'html/LevelType/' + levelType + '.html'
        StorageService.setData($scope.current);
    }

    $rootScope.setViewerPath = function (levelType) {

        $scope.current.viewer = '/html/viewer/' + levelType + '.html'
        // console.log("setViewerPath", $scope.current.viewer)
        StorageService.setData($scope.current);
    }


    $rootScope.playSound = function (soundId) {
        alert("playSound")
        //console.log(soundId);
        SoundService.playSound(soundId).then(result => {
        })
    }


    $scope.speak = function (text) {
        if (Math.random() > 0.5)
            responsiveVoice.speak(text, "Deutsch Male");
        else
            responsiveVoice.speak(text, "Deutsch Female");
    }



    $scope.playItem = function ($event, item, wait) {
        function func() {
            $timeout(function () {
                return def.resolve("ok");
            }, wait ? wait : 500);
        }

        const def = $q.defer();
        if (item.soundId === -1)
         {
             func();
         }
        else if (!item.soundId)
        {
            responsiveVoice.speak(item.title, "Deutsch Male", {onend: func});
        }
        else
        {
            SoundService.playSound(item.soundId).then(result => {
                func()
            });
        }
        return def.promise;
    }

    LessonService.getTeacherList().then(result => {
        $scope.current.teacherList = result;
        console.log("$scope.current.teacherList",$scope.current.teacherList)
        for (teacher of result) {
            teacher.courseListObj = JSON.parse(teacher.courseList);
        }
        StorageService.setData($scope.current);
    })


    $scope.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    $scope.charachter = $scope.getRandomInt(101, 102);


});