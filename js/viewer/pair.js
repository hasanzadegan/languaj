angular.module('myApp').controller('pairController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        var pair = [];
        var failCount = 0;
        $scope.func.disableList = {};

        $scope.charachter = $scope.getRandomInt(101,103);
        var previousTitle;
        $scope.func.checkAnswer = function (item) {
            if(previousTitle===item.title){
            }
            else{
                if(item.soundId)
                    $rootScope.playSound(item.soundId);
                pair.push(item.lexicalId);

                if (pair.length % 2 === 0) {
                    if (pair[pair.length - 1] === pair[pair.length - 2]) {
                        $scope.func.disableList[item.lexicalId] = true;
                    } else {
                        failCount = failCount+1;
                        if(failCount===1)
                            $scope.func.isInCorrect();
                        pair = pair.slice(0, pair.length - 2);
                    }
                }

                if ($scope.shuffleList.length == pair.length){
                    $scope.func.isCorrect();
                }
                previousTitle = item.title;
            }
        }


    });