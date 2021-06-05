angular.module('myApp').controller('commicController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {


        $scope.func.checkAnswer = function (result) {
                $scope.func.isCorrect();
        }


    });