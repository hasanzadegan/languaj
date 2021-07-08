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


        $scope.func.serialPlay = function ($event, cnt) {
            if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList.length > cnt) {
                levelItem = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[cnt];
                $scope.playItem($event, levelItem,1000).then(result => {
                    $scope.current.cnt  += 1;
                    $scope.func.serialPlay($event, $scope.current.cnt);
                });
            } else {
                $scope.func.toggleSelectOne();
                $scope.func.played = true;
            }
        }

        $scope.current.showOne = false;
        $scope.func.toggleSelectOne = function () {
            $scope.current.cnt = 0;
            $scope.current.showOne = !$scope.current.showOne;
            StorageService.setData($scope.current)
        }

        $scope.func.playAll = function ($event) {
            $scope.func.toggleSelectOne();
            $scope.current.cnt = 0;
            $scope.func.serialPlay($event, 0);
        }
    });
