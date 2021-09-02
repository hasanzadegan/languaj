angular.module('myApp').controller('allController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService, LevelService) {
        $scope.current.showOne = false;

        BaeService.getArticleList(2).then(function (result) {
            $scope.current.nominativeArticleList = {};
            articleObj = JSON.parse(result[0].articleList);
            for (item of articleObj) {
                $scope.current.nominativeArticleList[item.genderId] = item.title;
            }
            console.log($scope.current.nominativeArticleList)
            StorageService.setData($scope.current)
        });


        $scope.func.serialPlay = function ($event, cnt) {
            if ($scope.current.viewerData.levelLexicalPhraseList.length > cnt) {
                levelItem = $scope.current.viewerData.levelLexicalPhraseList[cnt];
                $scope.playItem($event, levelItem, 200).then(result => {
                    soundList = $scope.soundList[levelItem.lexicalId];
                    console.log("soundList",soundList)
                    if (soundList.length> 0) {
                        $scope.playItem($event, {soundId: soundList[0]}).then(result => {
                            $scope.current.cnt += 1;
                            $scope.func.serialPlay($event, $scope.current.cnt);
                        })
                    } else {
                        $scope.current.cnt += 1;
                        $scope.func.serialPlay($event, $scope.current.cnt);                    }
                })
            } else {
                $scope.func.toggleSelectOne();
                $scope.func.played = true;
            }
        }

        $scope.func.toggleSelectOne = function () {
            $scope.current.cnt = 0;
            $scope.current.showOne = !$scope.current.showOne;
            StorageService.setData($scope.current)
        }

        $scope.func.playAll = function ($event) {
            LevelService.getLevelLexicalPhraseSoundList($scope.loadLevelId).then(result => {

                $scope.soundList = {};
                for (item of result) {
                    $scope.soundList[item.lexicalId] = JSON.parse(item.soundList);
                }
                console.log("$scope.soundList",$scope.soundList)
                $scope.func.toggleSelectOne();
                $scope.current.cnt = 0;
                $scope.func.serialPlay($event, 0);
            })


        }
    });
