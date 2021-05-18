angular.module('myApp').controller('pairController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        var pair = [];
        var failCount = 0;
        $scope.disableList = {};

        $scope.charachter = $scope.getRandomInt(101,102);

        var previousTitle;
        $scope.checkAnswer = function (item) {
            if(previousTitle===item.title){
            }
            else{
                if(item.soundId)
                    $rootScope.playSound(item.soundId);
                pair.push(item.lexicalId);

                if (pair.length % 2 === 0) {
                    if (pair[pair.length - 1] === pair[pair.length - 2]) {
                        $scope.disableList[item.lexicalId] = true;
                    } else {
                        failCount = failCount+1;
                        if(failCount===3)
                            $scope.isInCorrect();
                        pair = pair.slice(0, pair.length - 2);
                    }
                }

                if ($scope.shuffleList.length == pair.length){
                    $scope.isCorrect();
                }
                previousTitle = item.title;
            }
        }


    });