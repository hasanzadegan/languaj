angular.module('myApp').controller('multiController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.func.selectChoice = function ($event,levelLexicalPhrase) {
            $scope.playItem($event,levelLexicalPhrase.itemJSONObj);
            $scope.func.selectedLevelLexicalPhrase = levelLexicalPhrase;
            $scope.func.selecteChoice = levelLexicalPhrase.itemJSONObj.validityTypeId;
            console.log($scope.func.selecteChoice )

            // $rootScope.playSound(levelLexicalPhrase.itemJSONObj.soundId);
        }

        $scope.func.checkChoice = function () {
            if ($scope.func.selecteChoice === 2) {
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });