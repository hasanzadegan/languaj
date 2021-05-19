app.service('LoginService', function ($rootScope, $path, $http, HttpService, StorageService, $q) {
    return {
        getProfile: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/users/me").then(result => {
                    def.resolve(result);
                },
                error => {
                    def.reject(error);
                }
            );
            return def.promise;
        },
        checkJWT: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/checkJWT").then(result => {
                console.log("jwt",result)
                    def.resolve(result);
                },
                error => {
                    def.reject(error);
                }
            );
            return def.promise;
        },
        impersonate: function (user) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/impersonate", user).then(result => {
                    def.resolve(result);
                },
                error => {
                    def.reject(error);
                }
            );
            return def.promise;
        },
        clearImpersonate: function (user) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/clearImpersonate").then(result => {
                    def.resolve(result);
                },
                error => {
                    def.reject(error);
                }
            );
            return def.promise;
        }
    }
});