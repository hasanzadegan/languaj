angular.module('myApp').controller('lessonDashboardController', function ($rootScope,
                                                                          $scope,
                                                                          $document,
                                                                          $q,
                                                                          LessonService,
                                                                          WordService,
                                                                          LevelService,
                                                                          TeachService,
                                                                          StorageService,
                                                                          $path) {


        var removeAfterCopy = 0;

        $scope.addToSelectedItem = function(level){
            level.clipboard = !level.clipboard;
            if(level.clipboard){
                LevelService.getLevelLexicalPhraseList(level.levelId).then(result => {
                    level.levelItemList = result;
                });
            }
        }

    $document.bind('keyup', function (event) {
            var selectedItemList = $scope.current.selectedCourse.selectedLesson.selectedTopic.levelList.filter(level=>{
                return level.clipboard == true;
            })

            if (event.keyCode == 88 && event.ctrlKey) {
                localStorage.setItem("__clipboard", JSON.stringify($scope.current.selectedLevel));
                removeAfterCopy = 1;
            }
            if (event.keyCode == 67 && event.ctrlKey) {
                localStorage.setItem("__clipboard", JSON.stringify($scope.current.selectedLevel))
                removeAfterCopy = 0;
            }
            if (event.keyCode == 86 && event.ctrlKey) {
                var clipboard = localStorage.getItem("__clipboard");
                if (clipboard) {
                    $scope.pasteLevel(JSON.parse(clipboard), removeAfterCopy);
                }
            }
        });
        $scope.pasteLevel = function (clipboard, removeAfterCopy) {

            topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
            review = $scope.current.review;
            level = {
                topicId: topicId,
                review:review,
                levelId: clipboard.levelId,
                title: clipboard.title,
                teachId: clipboard.teachId,
                levelTypeId: clipboard.levelTypeId,
                levelLexicalPhraseList: clipboard.levelLexicalPhraseList,
                isActive: 1,
            }
            LessonService.pasteLevel(level).then(result => {
                console.log("LessonService.pasteLevel(level)", result);
                localStorage.removeItem("__clipboard");
                if (removeAfterCopy) {
                    console.log("deleteLevel(level.levelId)", level.levelId, topicId);
                    LessonService.forceDeleteLevel(level.levelId).then(result => {
                        console.log("deleteLevel(level.levelId)", level.levelId, topicId);
                        $rootScope.$broadcast('topicChanged', topicId);
                    })
                } else {
                    $rootScope.$broadcast('topicChanged', topicId);
                }
            });
        }


        if ($scope.config.tabIndex === undefined) {
            $scope.config.tabIndex = 0;
            StorageService.setConfig($scope.config);
        }


        $scope.overLevel = function (levelItem) {
        }

        $scope.deleteLevel = function (levelId, force) {
            $scope.current.selectedLevelId = null;
            topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;

            if (force)
                LessonService.forceDeleteLevel(levelId).then(result => {
                    $rootScope.$broadcast('topicChanged', topicId);
                    StorageService.setData($scope.current);
                });
            else
                LessonService.deleteLevel(levelId).then(result => {
                    $rootScope.$broadcast('topicChanged', topicId);
                    StorageService.setData($scope.current);
                });
        }

        $scope.setLevelType = function (levelType, levelTitle, level) {
            params = [levelType.levelTypeId, levelTitle, level.levelId];
            LevelService.setLevelType(params).then(result => {
                $rootScope.$broadcast('topicChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
            })
        }

        $scope.updateLevel = function (level) {
            params = [level.title, level.orderr, level.levelId]
            LevelService.updateLevel(params).then(result => {
                $rootScope.$broadcast('topicChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
            });
        }

        $scope.$on("levelDataChanged", function ($event, level) {
            $scope.current.teach = null;
            $scope.current.selectedLevel = level;
            if (level.levelTypeId === 12) {
                $rootScope.setPropertyPage('teach');
                if (level.teachId !== null) {
                    TeachService.getTeach(level.teachId).then(result => {
                        $scope.current.teach = result;
                        StorageService.setData($scope.current);
                        $rootScope.$broadcast('teachChanged', result);
                    });
                }
            } else {
                $rootScope.setPropertyPage('dictionary');
            }
            $rootScope.$broadcast('levelChanged', level.levelId);
        })

        $scope.setLevel = function ($event,level) {
            $scope.current.selectedLevelItem = undefined;
            $scope.current.selectedLevelId = level.levelId;
            $scope.current.selectedLevelTypeId = level.levelTypeId;
            $rootScope.$broadcast('levelDataChanged', level);
        }

        $scope.changeLevelTopic = function (level, topic) {
            LessonService.changeLevelTopic(level.levelId, topic.topicId).then(result => {
                $rootScope.$broadcast('topicChanged', $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
            })
        }

        $scope.getTopicList = function (lessonId) {
            LessonService.getTopicList(lessonId).then(result => {
                $scope.current.topicList = result;
                if($scope.current.student.selectedCourse)
                    $scope.current.student.selectedCourse.selectedTopic = 0;
                StorageService.setData($scope.current);
            })
        }


        $scope.getLevelList = function (topicId) {
            console.log("$scope.getLevelList", topicId);
            LessonService.getLevelList(topicId).then(result => {
                $scope.current.selectedCourse.selectedLesson.selectedTopic.levelList = result;
                StorageService.setData($scope.current);
            })
        }

        $scope.addLevel = function (title) {

            topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
            review = $scope.current.review;

            level = {
                levelTypeId:1,
                topicId: topicId,
                teachId:null,
                title: title,
                isActive:1,
                review:review
            }
            console.log(level)

            LessonService.addLevel(level).then(result => {
                $scope.getLevelList(topicId);
            });
        }

        $scope.$on('topicChanged', function (event, topicId) {
            $scope.getLevelList(topicId);
        });

        $scope.$on('lessonChanged', function (event, lessonId) {
            $scope.getTopicList(lessonId);
        });


        if(!$scope.current.review)
            $scope.current.review = 1;
        $scope.selectReview = function (review) {
            $scope.current.review = review;
            StorageService.setData($scope.current)
        }
    }
);
