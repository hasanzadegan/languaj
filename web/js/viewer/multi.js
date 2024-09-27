angular.module('myApp').controller('multiController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {


        console.log("multi", $scope.func,$scope.current.viewerData);

        $scope.func.selectChoice = function ($event, levelLexicalPhrase) {
            $scope.playItem($event, levelLexicalPhrase.itemJSONObj);
            $scope.current.viewerData.selectedLevelLexicalPhrase = levelLexicalPhrase;
            $scope.func.validityTypeId = levelLexicalPhrase.itemJSONObj.validityTypeId;
            $scope.func.checkChoice();
        }

        $scope.func.checkChoice = function () {
            console.log(">>>>>>>>>>>>>>>. $scope.func",$scope.func)
            if ($scope.func.validityTypeId === 2) {
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });
