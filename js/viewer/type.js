angular.module('myApp').controller('typeController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        $scope.func.question = $scope.viewerData.levelLexicalPhraseList[0].itemJSONObj.lexicalPhrase.title;
        $scope.current.typeText = "";
        $scope.$on('levelChanged', function (event, levelId) {
            $scope.current.typeText = "";
        });

        $scope.func.checkType = function () {
            if($scope.viewerData.levelLexicalPhraseList[0].title===$scope.current.typeText){
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });