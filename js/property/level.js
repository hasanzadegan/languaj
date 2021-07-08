angular.module('myApp').controller('levelController',
    function ($rootScope, $scope, $q, WordService, BaeService,LessonService,LevelService,StorageService) {


        // $scope.deleteLevel= function (levelId) {
        //     LessonService.deleteLevel(levelId).then(result => {
        //
        //         topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
        //         $rootScope.$broadcast('topicChanged', topicId);
        //         StorageService.setData($scope.current);
        //     });
        // }
        // $scope.setLevelType = function (levelType) {
        //     params = [levelType.levelTypeId,$scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelId];
        //     LevelService.setLevelType(params).then(result => {
        //         $rootScope.$broadcast('levelChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelId);
        //     })
        // }

        // $scope.updateLevel = function(){
        //     params = [$scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.title,$scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelId]
        //     LevelService.updateLevel(params).then(result=>{
        //         $rootScope.$broadcast('topicChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
        //     });
        // }


    });
