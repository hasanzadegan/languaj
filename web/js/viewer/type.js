angular.module('myApp').controller('typeController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        $scope.current.typeText = '';
        $scope.func.checkType = function () {
            console.log("$scope.current.viewerData.questionItem",$scope.current.viewerData.questionItem)
            if($scope.current.viewerData.questionItem===$scope.current.typeText){
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }
    });
