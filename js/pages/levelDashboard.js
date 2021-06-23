angular.module('myApp').controller('levelDashboardController', function ($rootScope,
                                                                         $scope,
                                                                         StorageService,
                                                                         LevelService,
                                                                         LessonService,
                                                                         BaeService,
                                                                         WordService,
                                                                         ArchiveService,
                                                                         // TeachService,
                                                                         $q,
                                                                         $timeout,
                                                                         $path) {



        $timeout(function () {
            try {
            } catch (e) {
                $rootScope.$broadcast('levelChanged', $rootScope.viewerData.levelId);
            }
        }, 200)


        $scope.getLevelLexicalPhraseList = function (levelId) {
            LevelService.getLevelLexicalPhraseList(levelId).then(result => {
                $scope.viewerData.levelLexicalPhraseList = [];
                for (item of result) {
                    try {
                        item.itemJSONObj = JSON.parse(item.itemJSON);
                    } catch (e) {
                    }
                    $scope.viewerData.levelLexicalPhraseList.push(item);
                    $scope.extractWord();
                    StorageService.setData($scope.current)
                }
            })
        }
        $scope.$on("LevelLexicalPhraseListChanged", function (event, levelId) {
            $scope.getLevelLexicalPhraseList(levelId);
        })

        $scope.updateLevelItemJson = function (levelItem) {
            params = [JSON.stringify(levelItem.itemJSONObj), levelItem.levelLexicalPhraseId];
            LevelService.updateLevelItemJson(params).then(result => {
                $rootScope.$broadcast("levelChanged", $scope.viewerData.levelId)
                StorageService.setData($scope.current)
            });
        }

        $scope.changeValidityType = function (levelItem) {
            levelItem.itemJSONObj.validityTypeId = levelItem.itemJSONObj.validityTypeId + 1;
            if (levelItem.itemJSONObj.validityTypeId > $scope.current.validityTypeList.length)
                levelItem.itemJSONObj.validityTypeId = 1;
            $scope.updateLevelItemJson(levelItem);
        }

        $scope.flexTypeList = [
            // 25, 33,
            50, 100];
        $scope.changeFlexType = function (levelItem) {
            var nextFlex = {
                // 25: 33, 33: 50,
                50: 100,
                // 100: 25
                100: 50
            };
            levelItem.itemJSONObj.itemFlex = nextFlex[levelItem.itemJSONObj.itemFlex];
            $scope.updateLevelItemJson(levelItem);
        }

        $scope.levelBack = function () {
            $scope.current.selectedLevelItem = undefined;
            StorageService.setData($scope.current);
        }

        $scope.deleteLevelLexicalPhrase = function ($event, levelLexicalPhrase) {
            if ($event.ctrlKey) {
                LevelService.deleteLevelLexicalPhrase(levelLexicalPhrase.levelLexicalPhraseId).then(result => {
                    $rootScope.$broadcast('levelChanged', $scope.viewerData.levelId);
                });
            } else {
                alert("press ctrl key for delete");
            }
        }

        BaeService.getValidityType().then(result => {
            $scope.current.validityTypeList = result;
            StorageService.setData($scope.current);
        })


        BaeService.getGenderList().then(result => {
            $scope.genderList = result;
        })

        $scope.loadItemConfig = function (levelItem, viewerData) {
            if ($scope.current.selectedLevelItem !== undefined) {
                if ($scope.current.selectedLevelItem.levelLexicalPhraseId === levelItem.levelLexicalPhraseId) {
                    $scope.current.selectedLevelItem = {};
                    return
                }
            }
            $scope.current.selectedLevelItem = levelItem;

            WordService.getPhraseWordList(levelItem.phraseId).then(result => {
                $scope.current.selectedLevelItem.phraseWordList = result;
                StorageService.setData($scope.current);
            })

            WordService.getLexicalOtherPhraseList(levelItem.phraseId).then(result => {
                $scope.current.selectedLevelItem.lexicalPhraseList = result;
                StorageService.setData($scope.current);
            });

            WordService.getLexicalImageList($scope.current.selectedLevelItem.lexicalId).then(imageListResult => {
                $scope.current.LevelLexicalPhraseImageList = imageListResult;
                // ArchiveService.getImageList(imageListResult).then(result => {
                //     $scope.current.LevelLexicalPhraseImageList = result;
                // })
            });

            WordService.getPhraseSoundList($scope.current.selectedLevelItem.phraseId).then(result => {
                $scope.current.soundList = result;
            })

            LevelService.getLevelLexicalPhraseById(levelItem.levelLexicalPhraseId).then(result => {
                result[0].itemJSONObj = JSON.parse(result[0].itemJSON);
                $scope.current.selectedLevelItem.itemJSONObj = result[0].itemJSONObj;
                $rootScope.$broadcast("levelLexicalPhraseConfig" + viewerData.levelTypeId,
                    {viewerData: viewerData, LLP: result[0]}
                );
            });


            levelItem.soundList = []
        }


        $scope.selectLevelItem = function (levelItem, viewerData) {
            $scope.current.selectedLevelLexicalPhraseId = levelItem.levelLexicalPhraseId;
            if (levelItem.phraseId > 0) {
                WordService.getPhraseById(levelItem.phraseId).then(result => {
                    $scope.current.searchText = result[0].title;
                    $rootScope.findPhrase();
                    $rootScope.selectPhrase(result[0]);
                    StorageService.setData($scope.current);
                })
            } else {
                $scope.current.selectedPhrase = null;
                $scope.current.viewerData = [];
                $scope.current.searchText = '';
                $scope.current.phraseList = null;
            }

            StorageService.setData($scope.current);
            $scope.loadItemConfig(levelItem, viewerData);

        }

        $scope.setWordGender = function (genderId) {
            if ($scope.current.selectedLevelItem.itemJSONObj.wordList.length != 1)
                return null;
            $scope.current.selectedLevelItem.itemJSONObj.wordList[0].genderId = genderId;
            $scope.updateLevelItemJson($scope.current.selectedLevelItem);
        }

        $scope.setAnimation = function (animation) {
            $scope.current.selectedLevelItem.itemJSONObj.animation = animation;
            $scope.updateLevelItemJson($scope.current.selectedLevelItem);
        }

        $scope.setSound = function ($event, soundId) {
            $scope.current.selectedLevelItem.itemJSONObj.soundId = soundId;
            $scope.updateLevelItemJson($scope.current.selectedLevelItem);

            $scope.playItem($event, $scope.current.selectedLevelItem)
        }

        $scope.setHideText = function () {
            $scope.current.selectedLevelItem.itemJSONObj.hideText = !$scope.current.selectedLevelItem.itemJSONObj.hideText;
            $scope.updateLevelItemJson($scope.current.selectedLevelItem);
        }

        $scope.setImage = function (imageId) {
            $scope.current.selectedLevelItem.itemJSONObj.imageId = imageId;
            $scope.updateLevelItemJson($scope.current.selectedLevelItem);
        }


        $scope.directAssign = function () {

            itemJSON = {
                "showText": true, "soundId": null, "imageId": null, "validityTypeId": 1, "itemFlex": 100,
                "lexicalPhrase": {title: ''},
                "validityTypeId": 1,
                "title": $rootScope.replaceToken($scope.current.directText),
            };
            itemJSON = JSON.stringify(itemJSON);
            levelId = $scope.current.selectedLevel.levelId;
            LevelService.assignLevelLexicalPhrase(levelId, null, itemJSON).then(result => {
                $rootScope.$broadcast('levelChanged', levelId);
            });
        }

        //4 for spell
        $scope.$on("levelLexicalPhraseConfig4", function (event, params) {
            if (params.LLP.itemJSONObj.letterList === undefined) {
                $scope.current.selectedLevelItem.itemJSONObj.letterList = [];
                letterList = params.LLP.itemJSONObj.title.split('');

                for (i = 0; i < letterList.length; i++) {
                    $scope.current.selectedLevelItem.itemJSONObj.letterList.push({index: i, letter: letterList[i]});
                }
            }
        })

        $scope.hideLetter = function (id) {
            if ($scope.current.selectedLevelItem.itemJSONObj.letterList[id].hide === undefined)
                $scope.current.selectedLevelItem.itemJSONObj.letterList[id].hide = true;
            else
                $scope.current.selectedLevelItem.itemJSONObj.letterList[id].hide = undefined;
            $scope.current.selectedLevelItem.itemJSON = JSON.stringify($scope.current.selectedLevelItem.itemJSONObj);

            $scope.updateLevelItemJson($scope.current.selectedLevelItem);
            // StorageService.setData($scope.current);
        }


        $scope.addtooltip = function (word) {
            var index = 0;
            var wordId = 0;

            for (i = 0; i < $scope.current.selectedLevelItem.itemJSONObj.wordList.length; i++) {
                if ($scope.current.selectedLevelItem.itemJSONObj.wordList[i].phraseWordId === word.phraseWordId) {
                    index = i;
                    wordId = word.WordId;
                }
            }

            WordService.getLexicalOtherPhraseList(wordId).then(result => {
                $scope.current.selectedLevelItem.itemJSONObj.wordList[index].hintData = JSON.stringify(result);
                $scope.current.selectedLevelItem.itemJSONObj.wordList[index].showHint = !$scope.current.selectedLevelItem.itemJSONObj.wordList[index].showHint;
                $scope.updateLevelItemJson($scope.current.selectedLevelItem);

            })

        }

    }
);
