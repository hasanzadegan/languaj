angular.module('myApp').controller('introduceController',
    function ($rootScope, $scope, $q, $timeout, WordService, BaeService, StorageService, LessonService, SoundService) {
        // if ($scope.current.lexicalIndex === undefined)
        $scope.current.lexicalIndex = 0;

        if ($scope.current.viewerData)
            if ($scope.current.viewerData.levelLexicalPhraseList)
                if ($scope.current.viewerData.levelLexicalPhraseList.length > 0) {
                    soundId = $scope.current.viewerData.levelLexicalPhraseList[0].itemJSONObj.soundId;
                    if (soundId !== -1) {
                        console.log(">>>>>>>>>  ", soundId > 0, $scope.current.viewerData.levelLexicalPhraseList[0].title)
                        if (soundId > 0) {
                            SoundService.playSound(soundId, true);
                        } else {
                            $scope.speak($scope.current.viewerData.levelLexicalPhraseList[0].title)
                        }

                    }
                }


        $scope.func.showItem = function (id) {
            $scope.current.lexicalIndex = id
            $scope.speak($scope.current.viewerData.levelLexicalPhraseList[id].title)
            StorageService.setData($scope.current);
        }

    });
