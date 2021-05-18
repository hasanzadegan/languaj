angular.module('myApp').controller('commicController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {


        $scope.checkAnswer = function (result) {
                $scope.isCorrect();
        }


    });