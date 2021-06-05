angular.module('myApp').controller('viewerController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, SoundService, LessonService, LevelService, ArchiveService) {


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
            console.log("Correct");
            $rootScope.$broadcast("nextLevel");
        }

        $scope.func.isInCorrect = function () {
            console.log("inCorrect");
            SoundService.playSoundFile("/audio/app-incorrect.mp3", true).then(result => {
                $rootScope.$broadcast("nextLevel",{});
            })
        };



        $scope.func.iGotIt = function () {
            console.log("iGotIt",$scope.current.student.selectedCourse.selectedTopic);
            $rootScope.$broadcast("nextLevel",{});
        }

        $scope.showHint = function($event,word){
            $event.stopPropagation();
            $scope.hintData = JSON.parse(word.hintData);
        }

        $scope.hideHint = function () {
            $scope.hintData = null;
        }
    });