angular.module('myApp').controller('commicController', function ($rootScope, $scope, $path,StorageService) {
    $scope.saveItem = function () {
        $scope.updateLevelItemJson($scope.current.selectedLevelItem);
    }

    $scope.saveCharacter = function(id){
        $scope.current.selectedLevelItem.itemJSONObj.character = id;
        $scope.updateLevelItemJson($scope.current.selectedLevelItem);
    }

    $scope.number = 30;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
});