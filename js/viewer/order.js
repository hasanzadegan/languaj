angular.module('myApp').controller('orderController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        $scope.orderShuffleList = [];
        if($scope.viewerData.levelLexicalPhraseList.length<1){
            $scope.error = "Need One phrase"
        }
        else{
            $scope.question = $scope.viewerData.levelLexicalPhraseList[0].itemJSONObj.lexicalPhrase.title;
            $scope.answer = $scope.viewerData.levelLexicalPhraseList[0].itemJSONObj.title;

            totalWordList = [];
            $scope.answerWordList = [];
            for(levelLexicalPhrase of $scope.viewerData.levelLexicalPhraseList)
            {
                var wordList = levelLexicalPhrase.title.split(" ");
                totalWordList = totalWordList.concat(wordList);
            }
            $scope.orderShuffleList = $scope.shuffle(totalWordList);
            console.log($scope.orderShuffleList)
        }

        $scope.selectWord = function(index){
            $scope.answerWordList.push($scope.orderShuffleList[index]);
            $scope.orderShuffleList.splice(index,1);
            console.log("checkL",$scope.answer,$scope.answerWordList.join(" "),$scope.answer===$scope.answerWordList.join(" "))
        }

        $scope.deSelectWord = function(index){
            $scope.orderShuffleList.push($scope.answerWordList[index]);
            $scope.answerWordList.splice(index,1);
        }

        $scope.checkAnswer = function (result) {
            if($scope.answer===$scope.answerWordList.join(" ")){
                $scope.isCorrect();
            }
            else {
                $scope.isInCorrect();
            }
        }


    });