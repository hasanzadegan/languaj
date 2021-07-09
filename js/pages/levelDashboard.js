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
                $rootScope.$broadcast('levelChanged', $scope.current.viewerData.levelId);
            }
        }, 200)


        $scope.getLevelLexicalPhraseList = function (levelId) {
            LevelService.getLevelLexicalPhraseList(levelId).then(result => {
                $scope.current.viewerData.levelLexicalPhraseList = [];
                for (item of result) {
                    try {
                        item.itemJSONObj = JSON.parse(item.itemJSON);
                    } catch (e) {
                    }
                    $scope.current.viewerData.levelLexicalPhraseList.push(item);
                    $scope.extractWord();
                    StorageService.setData($scope.current)
                }
            })
        }
        $scope.$on("LevelLexicalPhraseListChanged", function (event, levelId) {
            $scope.getLevelLexicalPhraseList(levelId);
        })

        $scope.updateLevelLexicalJson = function (levelItem) {
            params = [JSON.stringify(levelItem.itemJSONObj), levelItem.levelLexicalPhraseId];
            LevelService.updateLevelLexicalJson(params).then(result => {
                StorageService.setData($scope.current)
            });
        }

        $scope.changeValidityType = function (levelItem) {
            levelItem.itemJSONObj.validityTypeId = levelItem.itemJSONObj.validityTypeId + 1;
            if (levelItem.itemJSONObj.validityTypeId > $scope.current.validityTypeList.length)
                levelItem.itemJSONObj.validityTypeId = 1;
            $scope.updateLevelLexicalJson(levelItem);
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
            $scope.updateLevelLexicalJson(levelItem);
        }

        $scope.levelBack = function () {
            StorageService.setData($scope.current);
        }

        $scope.deleteLevelLexicalPhrase = function ($event, levelLexicalPhrase) {
            if ($event.ctrlKey) {
                LevelService.deleteLevelLexicalPhrase(levelLexicalPhrase.levelLexicalPhraseId).then(result => {
                    $rootScope.$broadcast('levelChanged', $scope.current.viewerData.levelId);
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

        $scope.loadItemConfig = function (levelLexicalPhrase) {
            $scope.current.viewerData.selectedLevelLexicalPhrase = levelLexicalPhrase;

            WordService.getPhraseWordList(levelLexicalPhrase.phraseId).then(result => {
                $scope.current.viewerData.selectedLevelLexicalPhrase.phraseWordList = result;
                StorageService.setData($scope.current);
            })

            WordService.getLexicalOtherPhraseList(levelLexicalPhrase.phraseId).then(result => {
                $scope.current.viewerData.selectedLevelLexicalPhrase.lexicalPhraseList = result;
                StorageService.setData($scope.current);
            });

            WordService.getLexicalImageList($scope.current.viewerData.selectedLevelLexicalPhrase.lexicalId).then(imageListResult => {
                $scope.current.LevelLexicalPhraseImageList = imageListResult;
                // ArchiveService.getImageList(imageListResult).then(result => {
                //     $scope.current.LevelLexicalPhraseImageList = result;
                // })
            });

            WordService.getPhraseSoundList($scope.current.viewerData.selectedLevelLexicalPhrase.phraseId).then(result => {
                $scope.current.soundList = result;
            })

            LevelService.getLevelLexicalPhraseById(levelLexicalPhrase.levelLexicalPhraseId).then(result => {
                result[0].itemJSONObj = JSON.parse(result[0].itemJSON);
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj = result[0].itemJSONObj;
                $rootScope.$broadcast("levelLexicalPhraseConfig" + $scope.current.viewerData.levelTypeId,
                    {viewerData: $scope.current.viewerData, LLP: result[0]}
                );
            });


            levelLexicalPhrase.soundList = []
        }


        $scope.selectLevelItem = function (levelLexicalPhrase) {
            $scope.current.viewerData.selectedLevelLexicalPhrase = levelLexicalPhrase;

            if (levelLexicalPhrase.phraseId > 0) {
                WordService.getPhraseById(levelLexicalPhrase.phraseId).then(result => {
                    $scope.current.searchText = result[0].title;
                    $rootScope.findPhrase();
                    $rootScope.selectPhrase(result[0]);
                    StorageService.setData($scope.current);
                })
            } else {
                $scope.current.selectedPhrase = null;
                $scope.current.searchText = '';
                $scope.current.phraseList = null;
            }

            StorageService.setData($scope.current);
            $scope.loadItemConfig(levelLexicalPhrase, $scope.current.viewerData);

        }

        $scope.setWordGender = function (genderId) {
            if ($scope.current.viewerData.itemJSONObj.wordList.length != 1)
                return null;
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList[0].genderId = genderId;
            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
        }

        $scope.setAnimation = function (animation) {
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.animation = animation;
            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
        }

        $scope.setSound = function ($event, soundId) {
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.soundId = soundId;
            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);

            $scope.playItem($event, $scope.current.viewerData.selectedLevelLexicalPhrase)
        }

        $scope.setHideText = function () {
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.hideText = !$scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.hideText;
            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
        }

        $scope.setImage = function (imageId) {
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.imageId = imageId;
            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
        }


        $scope.directAssign = function () {

            itemJSON = {
                "showText": true, "soundId": null, "imageId": null, "validityTypeId": 1, "itemFlex": 100,
                "lexicalPhrase": {title: ''},
                "validityTypeId": 1,
                "title": $rootScope.replaceToken($scope.current.directText),
            };
            itemJSON = JSON.stringify(itemJSON);
            levelId = $scope.current.viewerData.levelId;
            LevelService.assignLevelLexicalPhrase(levelId, null, itemJSON).then(result => {
                $rootScope.$broadcast('levelChanged', levelId);
            });
        }

        //4 for spell
        $scope.$on("levelLexicalPhraseConfig4", function (event, params) {
            if (params.LLP.itemJSONObj.letterList === undefined) {
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.letterList = [];
                letterList = params.LLP.itemJSONObj.title.split('');

                for (i = 0; i < letterList.length; i++) {
                    $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.letterList.push({index: i, letter: letterList[i]});
                }
            }
        })

        $scope.hideLetter = function (id) {
            if ($scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.letterList[id].hide === undefined)
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.letterList[id].hide = true;
            else
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.letterList[id].hide = undefined;
            $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSON = JSON.stringify($scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj);

            $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
            // StorageService.setData($scope.current);
        }


        $scope.addtooltip = function (word) {
            var index = 0;
            var wordId = 0;

            for (i = 0; i < $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList.length; i++) {
                if ($scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList[i].phraseWordId === word.phraseWordId) {
                    index = i;
                    wordId = word.WordId;
                }
            }

            WordService.getLexicalOtherPhraseList(wordId).then(result => {
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList[index].hintData = JSON.stringify(result);
                $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList[index].showHint = !$scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.wordList[index].showHint;
                $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);

            })

        }

    }
);
