
app.controller('AppCtrl', function ($rootScope, $scope, $http, $window, $ocLazyLoad, $path,
                                    StorageService,
                                    WordService,
                                    // $label,
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

    // $window.navigator.vibrate(300)
    // change it for clear cache in clients
    $scope.currentVersion = currentVersion;

    $scope.Math = window.Math;
    $rootScope.extraLetters = ["Ä", "Ö", "Ü", "ẞ"]//,"ä","ö","ü","ß"];
    $rootScope.selectedLang = {"langId": 2, "title": "german", "code": "de"};

    if (!$scope.func)
        $scope.func = {};

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
        $window.location.href = "/api/auth/logout";
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
            templateUrl: 'html/dialog/' + dialogName + '.html?v=' + $scope.currentVersion,
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
        // {name: 'panorama', enabled: true, path: 'studentLevel'},
    ];

    BaeService.getLangList().then(function (data) {
        $scope.langList = data;
    })

    $rootScope.setIcon = function (icon) {
        $scope.config.studentPage = icon.path;
        StorageService.setConfig($scope.config);
    }


    $scope.__path = location.protocol + '//' + location.host;

    $scope.current = StorageService.getData();

    if ($scope.current.version !== $scope.currentVersion) {
        $scope.clearData();
        $scope.current.version = $scope.currentVersion;
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
    if (!$scope.config.tour)
        $scope.config.tour = {};


    try {
        $scope.responsiveVoice = responsiveVoice;
    } catch (e) {
    }

    $scope.backToList = function () {
        $scope.config.studentPage = "footerLesson";
        StorageService.setConfig($scope.config);
    }
    if(!$scope.config.studentPage)
    $scope.backToList();

    $scope.goToSetting = function () {
        $scope.config.studentPage = "footerSettings";
        StorageService.setConfig($scope.config);
    }

    $rootScope.store = function () {
        StorageService.setData($scope.current);
    }

    // $scope.current.profile = {"userId":11,"langId":1,"email":"sh.h.zadegan@gmail.com","firstName":"shahrokh","lastName":"hasanzadegan","imageUrl":"https://lh3.googleusercontent.com/a-/AOh14GjzzpyKCwdYZdCCItmmUSz01wL4W5jVW7Te__aw=s96-c","isActive":1,"credit":null,"teacherShare":null,"googleId":"107565574054469081237","firstName1":"شاهرخ","lastName1":"حسن زاده گان","ref":"NDE0"};
    // localStorage.setItem("__token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTEsImxhbmdJZCI6MSwiZW1haWwiOiJzaC5oLnphZGVnYW5AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoic2hhaHJva2giLCJsYXN0TmFtZSI6Imhhc2FuemFkZWdhbiIsImltYWdlVXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2p6enB5S0N3ZFlaZENDSXRtbVVTejAxd0w0VzVqVlc3VGVfX2F3PXM5Ni1jIiwiaXNBY3RpdmUiOjEsImNyZWRpdCI6bnVsbCwidGVhY2hlclNoYXJlIjpudWxsLCJnb29nbGVJZCI6IjEwNzU2NTU3NDA1NDQ2OTA4MTIzNyIsImZpcnN0TmFtZTEiOiLYtNin2YfYsdiuIiwibGFzdE5hbWUxIjoi2K3Ys9mGINiy2KfYr9mHINqv2KfZhiIsInJlZiI6Ik5ERTAifSwiaWF0IjoxNjIyODkxODA1LCJleHAiOjE2MjU0ODM4MDV9.DRKUuI6KPXvQ4mh79LA5_NaVSHiQnk_5abI1-dROiPk")
    // // StorageService.clear();
    // StorageService.setData($scope.current);

    if (localStorage.getItem("__token")) {
        LoginService.checkJWT().then(result => {
            if (result.decoded === undefined)
                $window.location.href = $path.url + "/api/auth/google";
            else
                $scope.current.profile = result.decoded.user;
            console.log($scope.current.profile)
        })
    } else {
        LoginService.getProfile().then((result) => {
            if (result === "") {
                $window.location.href = $path.url + "/api/auth/google";
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


    $scope.createViewerData = function (levelId) {

    }
    $scope.$on('levelChanged', function (event, levelId) {
        if (levelId !== null) {
            LessonService.getLevelById(levelId).then(levelResult => {
                var level = levelResult[0];

                $scope.current.viewerData = level;
                StorageService.setData($scope.current);

                var levelLexicalPhraseList = [];

                path = level.levelTypeTitle.split(" ")[0].toLowerCase();


                LevelService.getLevelLexicalPhraseList(levelId).then(result => {
                    $scope.levelItemList = [];
                    for (item of result) {
                        try {
                            item.itemJSONObj = JSON.parse(item.itemJSON);
                            item.itemJSONObj.title = $rootScope.replaceToken(item.itemJSONObj.title);
                            item.itemJSONObj.lexicalPhrase.title = $rootScope.replaceToken(item.itemJSONObj.lexicalPhrase.title);
                        } catch (e) {
                        }

                        if ([3].includes(level.levelTypeId) && item.itemJSONObj.validityTypeId == 2) {
                            $scope.current.viewerData.correctItem = item.itemJSONObj.lexicalPhrase.title;
                         }

                        if ([13, 7].includes(level.levelTypeId)) {
                            $scope.current.viewerData.correctItem = item.itemJSONObj.title;
                            $scope.current.viewerData.questionItem = item.itemJSONObj.lexicalPhrase.title;
                        }

                        if ([2].includes(level.levelTypeId)) {
                            $scope.current.viewerData.correctItem = "";
                            $scope.current.viewerData.questionItem = level.levelTypeTitle;
                        }

                        levelLexicalPhraseList.push(item);

                        StorageService.setData($scope.current)


                        try {

                            if (!item.itemJSONObj.lexicalPhrase)
                                item.itemJSONObj.lexicalPhrase = {title: ''};
                        } catch (e) {
                            item.itemJSONObj = {lexicalPhrase: {title: ''}};
                        }
                        if (!item.itemJSONObj.lexicalPhrase)
                            item.itemJSONObj.lexicalPhrase = {title: ''};

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

                    $scope.current.viewerData.levelLexicalPhraseList = levelLexicalPhraseList;



                    //pair
                    $scope.current.viewerData.shuffleList = $scope.shuffle($scope.levelItemList)

                    try {
                        $scope.func.createLevelData();

                    }catch (e) {
                    }

                    StorageService.setData($scope.current);

                    $rootScope.setLevelTypePath(path);
                    $rootScope.setViewerPath(path);
                    $rootScope.$broadcast('levelChangedWithDetail', levelId)
                })
                StorageService.setData($scope.current);
            })
        }
    });


    $scope.showAchievement = function () {
        $scope.current.viewer = 'html/viewer/achievement.html';
    }


    $scope.selectStudentLevel = function (levelId) {
        // console.log(levelId)

        $rootScope.$broadcast('levelChanged', levelId);

        $timeout(function () {
            $scope.config.studentPage = 'studentLevel';
            StorageService.setConfig($scope.config);
            $scope.config.showLevel = true;
            StorageService.setConfig($scope.config);
        }, 300)
    }


    $scope.$on("nextLevel", function (event, data) {
        levelList = $scope.current.student.selectedCourse.selectedTopic.levelList;
        levelIndex = $scope.current.student.selectedCourse.selectedTopic.levelIndex;
        levelIndex = levelIndex + 1;

        $scope.current.student.selectedCourse.selectedTopic.levelIndex = levelIndex;

        $scope.current.progress = levelIndex / (levelList.length) * 100

        StorageService.setData($scope.current);


        if (levelIndex > levelList.length - 1) {
            $scope.current.progress = 0;
            $scope.showAchievement();
        } else {
            nextLevel = levelList[levelIndex];
            $scope.selectStudentLevel(nextLevel.levelId);
            StorageService.setData($scope.current);
        }
    })

    // if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.level.levelId !== undefined)
    //     $rootScope.$broadcast('levelChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.level.levelId);


    $scope.saveStorage = function () {
        StorageService.setData($scope.current)
    }

    $scope.filterReset = function () {
        $scope.current.filter = {"grayScale": 0, "contrast": 100, "brightness": 100, "hue": 0};
    }
    $scope.filterReset();

    $rootScope.showCourseList = function(){
        $scope.current.showCourseSetting = !$scope.current.showCourseSetting;
        StorageService.setData($scope.current);
    }

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

        $rootScope.$broadcast('levelChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.level.levelId);
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
        StorageService.setData($scope.current);
    }


    $rootScope.playSound = function (soundId) {
        // alert("playSound")
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
        if (item.soundId === -1) {
            func();
        } else if (!item.soundId) {
            responsiveVoice.speak(item.title, "Deutsch Male", {onend: func});
        } else {
            SoundService.playSound(item.soundId).then(result => {
                func()
            });
        }
        return def.promise;
    }

    LessonService.getTeacherList().then(result => {
        $scope.current.teacherList = result;
        console.log("$scope.current.teacherList", $scope.current.teacherList)
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
    // $scope.getRand = function(){
    //     return Math.random();
    // }
    $scope.func.charachter = $scope.getRandomInt(101, 108);

    $scope.showBottomDialog = function (text, time) {
        $scope.current.dialogText = text;
        $timeout(function () {
            $scope.current.dialogText = null;
        }, time)
        $scope.current.dialogText = text;
    }

});
