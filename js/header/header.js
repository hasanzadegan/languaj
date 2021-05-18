angular.module('myApp').controller('headerController', function ($rootScope, $scope,LoginService,
                                                                 TeachService,
                                                                 StorageService,
                                                                 LessonService,
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

    // $scope.showTeach = function () {
    //     $scope.current.showTeach = false;
    //
    //     path = "gramatic";
    //     $rootScope.setLevelTypePath(path);
    //     $rootScope.setViewerPath(path);
    //
    //     $scope.current.teachIsShow = false;
    //     StorageService.setData($scope.current)
    // }

    $scope.hideTeach = function () {
        $scope.current.teachIsShow = false;
        path = $scope.current.selectedLevel.levelTypeTitle;
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


    //
    // if($scope.current.teachIsShow)
    //     $scope.showTeach();

});