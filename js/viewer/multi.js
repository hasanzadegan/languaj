angular.module('myApp').controller('multiController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.selectChoice = function ($event,levelLexicalPhrase) {
            $scope.playItem($event,levelLexicalPhrase.itemJSONObj);
            $scope.selectedLevelLexicalPhrase = levelLexicalPhrase;
            $scope.selecteChoice = levelLexicalPhrase.itemJSONObj.validityTypeId;
            console.log($scope.selecteChoice )

            // $rootScope.playSound(levelLexicalPhrase.itemJSONObj.soundId);
        }

        $scope.checkChoice = function () {
            if ($scope.selecteChoice === 2) {
                $scope.isCorrect();
            } else {
                $scope.isInCorrect();
            }
        }

    });