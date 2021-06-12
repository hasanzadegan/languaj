angular.module('myApp').controller('viewerController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, SoundService, LessonService, LevelService, ArchiveService) {

        $scope.$on('levelChanged', function (event, levelId) {
            $scope.func.charachter = $scope.getRandomInt(101, 108);
            $scope.current.answerIsCorrect = null;
        });

        try{
            $scope.current.correctAnswer = $scope.viewerData.levelLexicalPhraseList[0].itemJSONObj.title;
        }catch (e) {
            $scope.current.correctAnswer = "";
        }

        BaeService.getLevelType().then(result => {
            $scope.current.levelTypeList = result;
            StorageService.setData($scope.current);
        })

        $rootScope.goHome = function () {
            $scope.config.showLevel = false;
            StorageService.setConfig($scope.config);
        }


        $rootScope.goLevel = function () {
            $scope.config.showLevel = true;
            StorageService.setConfig($scope.config);
        }


        $scope.func.isCorrect = function () {
            if($scope.current.answerIsCorrect)
                return;
            console.log("Correct");
            $scope.current.answerIsCorrect = 1;
            StorageService.setData($scope.current);
            SoundService.playSoundFile("/audio/app-correct.mp3", true).then(result => {
                // $rootScope.$broadcast("nextLevel",{});
            })
        }

        $scope.func.isInCorrect = function () {
            $scope.viewerData.levelLexicalPhraseList.filter(item => {
                if(item.itemJSONObj.validityTypeId===1)
                {
                    $scope.current.correctAnswerText = item.itemJSONObj.lexicalPhrase.title;
                    StorageService.setData($scope.current)
                }
            })

            if($scope.current.answerIsCorrect)
                return;
            console.log("inCorrect");
            $scope.current.answerIsCorrect = -1;
            StorageService.setData($scope.current);
            SoundService.playSoundFile("/audio/app-incorrect.mp3", true).then(result => {
                // $rootScope.$broadcast("nextLevel",{});
            })
        };


        $scope.func.iGotIt = function () {
            console.log("iGotIt", $scope.current.student.selectedCourse.selectedTopic);
            $rootScope.$broadcast("nextLevel", {});
        }

        $scope.func.nextLevel = function () {
            $rootScope.$broadcast("nextLevel", {});
        }

        $scope.showHint = function ($event, word) {
            $event.stopPropagation();
            $scope.hintData = JSON.parse(word.hintData);
        }

        $scope.hideHint = function () {
            $scope.hintData = null;
        }
    });