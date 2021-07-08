angular.module('myApp').controller('spellController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        // $scope.lexicalPhrase = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[0];

        $scope.$on('levelChanged', function (event, levelId) {
        });

        $scope.func.checkIsLastInput = function ($event, quiz, $index) {
            var c = 0;
            maxIndex = 0;
            for (letter of quiz.itemJSONObj.letterList) {
                if (letter.hide === true) {
                    maxIndex = c;
                }
                c = c + 1;
            }
            if(maxIndex===$index){
                $scope.func.checkSpell($event,quiz,quiz.answer);
            }
        }

        $scope.func.checkSpell = function ($event, quiz, answer) {
            $scope.playItem($event, quiz);
            if (answer === undefined)
                return;

            var result = true;
            for (letter of quiz.itemJSONObj.letterList) {
                if (letter.hide) {
                    if (letter.letter !== answer[letter.index])
                        result = false;
                }
            }

            quiz.result = result;
            quiz.disabled = true;

            allCorrect = true;
            allDone = true;

            for (item of $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList) {
                if (item.result === false)
                    allCorrect = false;
                if (item.result === undefined)
                    allDone = false;
            }
            if (allDone) {
                if (allCorrect)
                    $scope.func.isCorrect();
                else
                    $scope.func.isInCorrect();
            }
        }
    });
