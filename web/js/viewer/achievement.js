angular.module('myApp').controller('achievementController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        var topicId = $scope.current.student.selectedCourse.selectedTopic.topicId;
        var review= $scope.current.student.selectedCourse.selectedTopic.review==null?1:$scope.current.student.selectedCourse.selectedTopic.review+1;
        console.log(">>>>>>>.review",review)

        LessonService.addAchievement(topicId,review).then(result=>{
            $scope.achieved = true
        })
    });
