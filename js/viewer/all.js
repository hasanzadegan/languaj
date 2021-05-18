angular.module('myApp').controller('allController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        BaeService.getArticleList(2).then(function (result) {
            $scope.current.nominativeArticleList = {};
            articleObj = JSON.parse(result[0].articleList);
            for (item of articleObj) {
                $scope.current.nominativeArticleList[item.genderId] = item.title;
            }
            console.log($scope.current.nominativeArticleList)
            StorageService.setData($scope.current)
        });


        $scope.serialPlay = function ($event, cnt) {
            if ($scope.viewerData.levelLexicalPhraseList.length > cnt) {
                levelItem = $scope.viewerData.levelLexicalPhraseList[cnt];
                $scope.playItem($event, levelItem,1000).then(result => {
                    $scope.current.cnt  += 1;
                    $scope.serialPlay($event, $scope.current.cnt);
                });
            } else {
                $scope.toggleSelectOne();
                $scope.played = true;
            }
        }

        $scope.current.showOne = false;
        $scope.toggleSelectOne = function () {
            $scope.current.cnt = 0;
            $scope.current.showOne = !$scope.current.showOne;
            StorageService.setData($scope.current)
        }

        $scope.playAll = function ($event) {
            $scope.toggleSelectOne();
            $scope.current.cnt = 0;
            $scope.serialPlay($event, 0);
        }
    });