angular.module('myApp').service('VerbService', function ($rootScope, $path, HttpService, $q) {
    return {
        updateConjugation: function (infinitiveId,tenseId,pronoungroupId,title) {
            const def = $q.defer();
            param = {"infinitiveId":infinitiveId,"tenseId":tenseId,"pronoungroupId":pronoungroupId,"title":title};
            // console.log("updateConjugation",param)
            HttpService.post($path.url + "/api/updateConjugation", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
    }
});

