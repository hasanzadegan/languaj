angular.module('myApp').controller('conjugationController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.qustionList = {};

        $scope.$on('levelChangedWithDetail', function (event, levelId) {
            if ($rootScope.viewerData.levelLexicalPhraseList.length < 1) {
                // console.log("need to element");
            } else {
                $scope.conjugations = {};

                $scope.wordList = $rootScope.viewerData.levelLexicalPhraseList[0].itemJSONObj.wordList;
                var cnt = 0;
                $scope.verbList =  $scope.wordList.filter(function (word) {
                    if(word.POSTypeId===2)
                    {
                        cnt = cnt + 1;
                        word.cnt = cnt;
                        WordService.getConjugationList(word.infinitiveId, word.tenseId).then(result => {
                            $scope.conjugations[word.cnt] = result;
                        })
                    }
                    return word.POSTypeId === 2;
                })
            }
        });

        $rootScope.$broadcast('levelChangedWithDetail', $rootScope.viewerData.levelId)


        $scope.setWordAnswer = function (word, conjugation, index) {
            $scope.speak(conjugation.title)
            wordData = {};
            wordData.index = index;
            if (word.title === conjugation.title) {
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