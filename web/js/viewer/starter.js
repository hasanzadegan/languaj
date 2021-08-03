angular.module('myApp').controller('starterController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        BaeService.getArticleList(2).then(function (result) {
            $scope.current.nominativeArticleList = {};
            articleObj = JSON.parse(result[0].articleList);
            for (item of articleObj) {
                $scope.current.nominativeArticleList[item.genderId] = item.title;
            }
            StorageService.setData($scope.current)
        });


        $scope.serialPlay = function ($event, soundId, cnt) {
            if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList.length > cnt) {
                SoundService.playSound(soundId, true).then(result => {
                    $scope.current.cnt = cnt + 1;
                    // $timeout(function () {
                    if ($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[$scope.current.cnt])
                        $scope.serialPlay($event, $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[$scope.current.cnt].itemJSONObj.soundId, $scope.current.cnt)
                    // }, 1000);
                }).catch(error => {
                })

            } else {
            }
        }

        $scope.selectOne = function () {
            $scope.current.cnt = 0;
            StorageService.setData($scope.current)
        }

        $scope.playAll = function ($event) {
            $scope.current.cnt = 0;
            $scope.serialPlay($event, $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelLexicalPhraseList[$scope.current.cnt].itemJSONObj.soundId, $scope.current.cnt);
        }
    });
