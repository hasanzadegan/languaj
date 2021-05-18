app = angular.module('myApp', ['ngMaterial', 'ngAnimate', 'ngStorage',]
).controller('roleCtrl', function ($rootScope, $scope, $http,
                                  $mdDialog,
                                  $path,
                                  $window,
                                  StorageService,
                                  $q,
) {
    if(localStorage.__path)
        $window.location.href = localStorage.__path;

    $scope.setPath = function(path) {
        localStorage.__path = path;
        StorageService.setPath(path);
        $window.location.href = path;
    }
});