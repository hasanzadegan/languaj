angular.module('myApp').controller('commicController', function ($rootScope, $scope, $path,StorageService) {
    $scope.saveItem = function () {
        $scope.updateLevelLexicalJson($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.selectedLevelLexicalPhrase);
    }

    $scope.saveCharacter = function(id){
        $scope.current.viewerData.selectedLevelLexicalPhrase.itemJSONObj.character = id;
        $scope.updateLevelLexicalJson($scope.current.viewerData.selectedLevelLexicalPhrase);
    }

    $scope.number = 30;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
});
