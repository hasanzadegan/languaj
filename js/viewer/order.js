angular.module('myApp').controller('orderController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        $scope.func.orderShuffleList = [];
        if($scope.viewerData.levelLexicalPhraseList.length<1){
            $scope.error = "Need One phrase"
        }
        else{
            $scope.func.answer = $scope.viewerData.levelLexicalPhraseList[0].itemJSONObj.title;
            totalWordList = [];
            $scope.func.answerWordList = [];
            for(levelLexicalPhrase of $scope.viewerData.levelLexicalPhraseList)
            {
                var wordList = levelLexicalPhrase.title.split(" ");
                totalWordList = totalWordList.concat(wordList);
            }
            $scope.func.orderShuffleList = $scope.shuffle(totalWordList);
        }

        $scope.func.selectWord = function(index){
            $scope.func.answerWordList.push($scope.func.orderShuffleList[index]);
            $scope.func.orderShuffleList.splice(index,1);
            console.log("checkL",$scope.answer,$scope.func.answerWordList.join(" "),$scope.answer===$scope.func.answerWordList.join(" "))
        }

        $scope.func.deSelectWord = function(index){
            $scope.func.orderShuffleList.push($scope.func.answerWordList[index]);
            $scope.func.answerWordList.splice(index,1);
        }

        $scope.func.checkAnswer = function (result) {
            if($scope.func.answer===$scope.func.answerWordList.join(" ")){
                $scope.func.isCorrect();
            }
            else {
                $scope.func.isInCorrect();
            }
        }


    });