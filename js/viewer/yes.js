angular.module('myApp').controller('yesController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        if($scope.viewerData.levelLexicalPhraseList.length<2){
            // console.log("yes or no need to element");
        }
        else{
            $scope.questionLexicalPhrase = $scope.viewerData.levelLexicalPhraseList[0];
            $scope.rand = Math.random();
            if($scope.rand>0.5){
                $scope.answerLexicalPhrase = $scope.viewerData.levelLexicalPhraseList[1];
                $scope.result = false;
            }
            else{
                $scope.answerLexicalPhrase = $scope.viewerData.levelLexicalPhraseList[0];
                $scope.result = true;
            }
        }

        $scope.checkAnswer = function (result) {
            if($scope.result===result){
                $scope.isCorrect();
            }else {
                $scope.isInCorrect();
            }
        }


    });