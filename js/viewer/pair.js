angular.module('myApp').controller('pairController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {

        var pair = [];
        var failCount = 0;

        $scope.resetPair = function(){
            pair = [];
            failCount = 0;
            $scope.func.disableList = {};
            $scope.current.viewerData.title = null;
        };

        $scope.resetPair();

        $scope.$on('levelChanged', function (event, levelId) {
            $scope.resetPair();
        });

        var previousTitle;
        $scope.func.checkAnswer = function (item) {
            if (previousTitle === item.title) {

            } else {

                if (item.soundId)
                    $rootScope.playSound(item.soundId);
                pair.push(item.lexicalId);

                if (pair.length % 2 === 0) {
                    if (pair[pair.length - 1] === pair[pair.length - 2]) {
                        $scope.func.disableList[item.lexicalId] = true;
                    } else {
                        failCount = failCount + 1;
                        if (failCount === 1) {
                            console.log("failCount",failCount,pair)
                            $scope.func.isInCorrect();
                            $scope.func.nextLevel();
                        }
                        pair = pair.slice(0, pair.length - 2);
                    }
                }

                if ($scope.current.viewerData.shuffleList.length == pair.length) {
                    $scope.func.isCorrect();
                    $scope.func.nextLevel();
                }
                previousTitle = item.title;
            }
        }


    });
