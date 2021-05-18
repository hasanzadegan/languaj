angular.module('myApp').controller('levelController',
    function ($rootScope, $scope, $q, WordService, BaeService,LessonService,LevelService,StorageService) {


        // $scope.deleteLevel= function (levelId) {
        //     LessonService.deleteLevel(levelId).then(result => {
        //
        //         $scope.current.selectedLevelId = null;
        //         topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
        //         $rootScope.$broadcast('topicChanged', topicId);
        //         StorageService.setData($scope.current);
        //     });
        // }
        // $scope.setLevelType = function (levelType) {
        //     params = [levelType.levelTypeId,$scope.viewerData.levelId];
        //     LevelService.setLevelType(params).then(result => {
        //         $rootScope.$broadcast('levelChanged', $scope.viewerData.levelId);
        //     })
        // }

        // $scope.updateLevel = function(){
        //     params = [$scope.viewerData.title,$scope.viewerData.levelId]
        //     LevelService.updateLevel(params).then(result=>{
        //         $rootScope.$broadcast('topicChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
        //     });
        // }


    });