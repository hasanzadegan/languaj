app.service('HttpService', function ($rootScope, $q, $http) {
    return {
        post: function (path, param) {
            const def = $q.defer();
            $rootScope.isHttpCalling = true;
            $http({
                method: 'Post',
                url: path,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem("__token")
                },
                data: param,
            })
                .then(function (result) {
                        $rootScope.isHttpCalling = false;
                        def.resolve(result.data);
                    },
                    function (error) {
                        if(error==="invalidJWT")
                            location.href = "/api/auth/google";
                        $rootScope.isHttpCalling = false;
                        def.reject(error.data);
                    });

            return def.promise;
        },
        get: function (path) {
            const def = $q.defer();
            $rootScope.isHttpCalling = true;
            $http({
                method: 'Get',
                url: path,
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("__token")
                },
            })
                .then(function (result) {
                        // if(result.message==="invalidJWT")
                        //     location.href = "/api/auth/google";

                        $rootScope.isHttpCalling = false;
                        return def.resolve(result.data);
                    },
                    function (error) {
                        //todo error handeling
                        if(error==="invalidJWT")
                            location.href = "/api/auth/google";
                        $rootScope.isHttpCalling = false;
                        return def.reject(error.data);
                    });

            return def.promise;
        },
        delete: function (path) {
            const def = $q.defer();
            $rootScope.isHttpCalling = true;
            $http({
                method: 'Delete',
                url: path,
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem("__token")
                },
            })
                .then(function (result) {
                        $rootScope.isHttpCalling = false;
                        return def.resolve(result.data);
                    },
                    function (error) {
                        if(error==="invalidJWT")
                            location.href = "/api/auth/google";
                        $rootScope.isHttpCalling = false;
                        return def.reject(error.data);
                    });

            return def.promise;
        },
    }
});
