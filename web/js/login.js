app = angular.module('myApp', ['ngMaterial', 'ngAnimate', 'ngStorage',]
).controller('loginCtrl', function ($rootScope, $scope, $http,
                                  $mdDialog,
                                  $path,
                                  $window,
                                  StorageService,
                                  $q,
) {
    $scope.config =  StorageService.getConfig()
    console.log($path.url+"/api/auth/google")
    if($scope.config.sso==="google")
        $window.location.href = $path.url+"/api/auth/google";
});