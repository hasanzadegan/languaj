angular.module('myApp').controller('typeController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {


        $scope.func.checkType = function () {
            if($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[0].title===$scope.current.typeText){
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });
