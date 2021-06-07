angular.module('myApp').controller('multiController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.func.selectChoice = function ($event,levelLexicalPhrase) {
            $scope.playItem($event,levelLexicalPhrase.itemJSONObj);
            $scope.func.selectedLevelLexicalPhrase = levelLexicalPhrase;
            $scope.func.selecteChoice = levelLexicalPhrase.itemJSONObj.validityTypeId;
            $scope.func.checkChoice();
        }

        $scope.func.checkChoice = function () {
            console.log($scope.func)
            if ($scope.func.selecteChoice === 2) {
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });