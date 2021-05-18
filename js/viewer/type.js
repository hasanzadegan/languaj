angular.module('myApp').controller('typeController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.checkType = function () {
            if($scope.viewerData.levelLexicalPhraseList[0].title===$scope.current.typeText){
                $scope.isCorrect();
            } else {
                $scope.isInCorrect();
            }
        }

    });