angular.module('myApp').controller('articleController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.qustionList = {};


        $scope.$on('levelChangedWithDetail', function (event, levelId) {
            BaeService.getPronounList(2).then(function (result) {
                for (item of result) {
                    item.pronounListObj = JSON.parse(item.pronounList);
                }
                $scope.current.kasusList = result;
                StorageService.setData($scope.current);
            });


            if ($rootScope.viewerData.levelLexicalPhraseList.length < 1) {
                console.log("need to element");
            } else {
                $scope.conjugations = {};

                $scope.wordList = $rootScope.viewerData.levelLexicalPhraseList[0].itemJSONObj.wordList;
                var cnt = 0;
                $scope.articleList =  $scope.wordList.filter(function (word) {
                    if(word.POSTypeId===5)
                    {
                        cnt = cnt + 1;
                        word.cnt = cnt;
                    }
                    return word.POSTypeId === 5;
                })
            }
            //
            // if ($rootScope.viewerData.levelLexicalPhraseList.length >= 1) {
            //     console.log(">>>>>", $scope.current.kasusList)
            //     $scope.pronounList = {};
            //     $scope.wordList = $rootScope.viewerData.levelLexicalPhraseList[0].itemJSONObj.wordList;
            //
            //
            //     for (word of $scope.wordList) {
            //         if (word.POSTypeId === 5) {
            //             console.log(word)
            //             $scope.qustionList[word.phraseWordId] = {answer: false};
            //             var phraseWordId = word.phraseWordId;
            //         }
            //     }
            // }
        });

        $rootScope.$broadcast('levelChangedWithDetail', $rootScope.viewerData.levelId)


        $scope.setWordAnswer = function (word, pronoun, index) {
            // console.log(word, pronoun, index)
            wordData = {};
            wordData.index = index;
            if (word.title.toLowerCase() === pronoun.title.toLowerCase()) {
                wordData.answer = true;
            } else {
                wordData.answer = false;
            }
            $scope.qustionList[word.phraseWordId] = wordData;

        }

        $scope.checkAnswer = function (result) {
            isCorrect = true;
            for (word of $scope.wordList) {
                if ($scope.qustionList[word.phraseWordId] !== undefined && $scope.qustionList[word.phraseWordId].answer === false) {
                    isCorrect = false;
                }
            }
            if (isCorrect)
                $scope.isCorrect();
            else
                $scope.isInCorrect();
        }


    });