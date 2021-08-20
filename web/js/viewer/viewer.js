angular.module('myApp').controller('viewerController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, SoundService, LessonService, LevelService, ArchiveService) {



        try{
            $scope.current.correctAnswer = $scope.current.viewerData.levelLexicalPhraseList[0].itemJSONObj.title;
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
            $scope.current.viewerData.levelLexicalPhraseList.filter(item => {
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
            try {
                $scope.func.logMistake({});
            }catch (e) {

            }
        };


        $scope.func.iGotIt = function () {
            console.log("iGotIt", $scope.current.student.selectedCourse.selectedTopic);
            $rootScope.$broadcast("nextLevel", {});
        }

        $scope.func.nextLevel = function () {
            $scope.current.answerIsCorrect = null;
            $rootScope.$broadcast("nextLevel", {});
        }

        $scope.func.logMistake = function(mistakeJSON){
            levelList = $scope.current.student.selectedCourse.selectedTopic.levelList;
            levelIndex = $scope.current.student.selectedCourse.selectedTopic.levelIndex;
            console.log("log event for mistake >>>>> levelId:"+levelList[levelIndex].levelId+" review:0");
            let levelId = levelList[levelIndex].levelId;
            let mistake = {levelId :levelId,mistakeJSON:mistakeJSON};
            LessonService.addUserMistake(mistake).then(result=>{
                $scope.getUserMistakeStatus();
            });
        }

        $scope.showHint = function ($event, word) {
            $event.stopPropagation();
            $scope.hintData = JSON.parse(word.hintData);
        }

        $scope.hideHint = function () {
            $scope.hintData = null;
        }
    });
