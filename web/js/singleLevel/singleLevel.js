angular.module('myApp').controller('singleController',
function ($rootScope, $scope, $q, WordService, BaeService,LessonService,LevelService,StorageService,SoundService) {
    $scope.current.answerIsCorrect = null;
    $scope.current.viewerData = {};
    $rootScope.$broadcast('levelChanged', $scope.loadLevelId)
});

