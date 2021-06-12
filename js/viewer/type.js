angular.module('myApp').controller('typeController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        $scope.resetType = function(){
            $scope.current.typeText = "";
        }
        $scope.resetType();

        $scope.$on('levelChanged', function (event, levelId) {
            $scope.resetType();
        });

        $scope.func.checkType = function () {
            if($scope.viewerData.levelLexicalPhraseList[0].title===$scope.current.typeText){
                $scope.func.isCorrect();
            } else {
                $scope.func.isInCorrect();
            }
        }

    });