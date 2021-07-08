angular.module('myApp').controller('introduceController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        // if ($scope.current.lexicalIndex === undefined)
        $scope.current.answerIsCorrect = null;
        $scope.current.lexicalIndex = 0;

        if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel)
            if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList)
                if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList.length > 0) {
                    soundId = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[0].itemJSONObj.soundId;
                    if (soundId !== -1) {
                        console.log(">>>>>>>>>  ", soundId > 0, $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[0].title)
                        if (soundId > 0) {
                            SoundService.playSound(soundId, true);
                        } else {
                            $scope.speak($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[0].title)
                        }

                    }
                }


        $scope.func.showItem = function (id) {
            $scope.current.lexicalIndex = id
            $scope.speak($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[id].title)
            StorageService.setData($scope.current);
        }

    });
