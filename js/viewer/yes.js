angular.module('myApp').controller('yesController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        console.log("$scope.current.viewerData",$scope.current.viewerData)
        if($scope.current.viewerData.levelLexicalPhraseList.length<2){
            // console.log("yes or no need to element");
        }
        else{
            $scope.func.rand = Math.random();
            if($scope.func.rand>0.5){
                $scope.func.answerLexicalPhrase = $scope.current.viewerData.levelLexicalPhraseList[1];
                $scope.func.result = false;
            }
            else{
                $scope.func.answerLexicalPhrase = $scope.current.viewerData.levelLexicalPhraseList[0];
                $scope.func.result = true;
            }
        }

        $scope.func.checkAnswer = function (result) {
            if($scope.func.result===result){
                $scope.func.isCorrect();
            }else {
                $scope.func.isInCorrect();
            }
        }


    });
