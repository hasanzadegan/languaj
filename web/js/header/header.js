angular.module('myApp').controller('headerController', function ($rootScope, $scope,LoginService,
                                                                 TeachService,
                                                                 StorageService,
                                                                 LessonService,
                                                                 LevelService,
                                                                 ArchiveService,
                                                                 $q, $path) {

    $scope.impersonate = function (teacher) {
        LoginService.impersonate(teacher).then(result=>{
            console.log("result",result)
            $scope.current.impersonateUser = result;
            $rootScope.$broadcast("userChanged");
            // $scope.profile = result;
        })
    }
    $scope.clearImpersonate = function (teacher) {
        LoginService.clearImpersonate().then(result=>{
            $scope.current.impersonateUser = null;
            $rootScope.$broadcast("userChanged");
        })
    }



    $scope.updateCourseLang = function (course,sourceLangId,destLangId) {
        params = [
            $scope.current.selectedCourse.title,
            sourceLangId,
            destLangId,
            $scope.current.selectedCourse.courseId,
        ];
        console.log(params)
        LevelService.updateCourse(params).then(result => {
            $scope.current.selectedCourse.sourceLangId = sourceLangId;
            $scope.current.selectedCourse.destLangId = destLangId;
            StorageService.setData($scope.current);
            course.editMode = false;
        });
    }


    $scope.uploadTopicImage = function ($files) {
        var f = $files[0];
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                var base64String = window.btoa(binaryData);
                docData = "data:" + f.type + ";base64," + base64String;
                fileData = {docData: docData}
                ArchiveService.saveDoc(fileData).then(result => {
                    topic = $scope.current.selectedCourse.selectedLesson.selectedTopic;
                    topic.imageId = result.insertId;
                    params = [topic.title, topic.orderr,topic.imageId,topic.topicId];
                    LevelService.updateTopic(params).then(result=>{
                        console.log("LevelService.updateTopic",result)
                        $scope.current.selectedCourse.selectedLesson.selectedTopic.imageId = topic.imageId;
                    });
                })
            };
        })(f);
        reader.readAsBinaryString(f);
    };

    $scope.hideTeach = function () {
        $scope.current.teachIsShow = false;
        path = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelTypeTitle;
        $rootScope.setLevelTypePath(path);
        $rootScope.setViewerPath(path);

        StorageService.setData($scope.current);
        $rootScope.$broadcast('levelDataChanged', $scope.current.selectedLevel);

    }


    $scope.getLevelList = function (topicId) {
        LessonService.getLevelList(topicId).then(result => {
            $scope.current.selectedCourse.selectedLesson.selectedTopic.levelList = result;
            StorageService.setData($scope.current);
        })
    }

    $scope.addLevel = function (title) {
        topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
        review = $scope.current.review;
        level = {
            levelTypeId:1,
            topicId: topicId,
            teachId:null,
            title: title,
            isActive:1,
            review:review
        }

        LessonService.addLevel(level).then(result => {
            $scope.getLevelList(topicId);
        });
    }

    $scope.directSearchLevel = function($event){
        LessonService.getLevelById($scope.current.directLevelId).then(result=>{
            if(result.length>0){
                level = result[0];
                $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel = level;
                $rootScope.$broadcast('levelDataChanged', level);
                $scope.refreshIFrame();
            }
        })
    }
    //
    // if($scope.current.teachIsShow)
    //     $scope.showTeach();

});
