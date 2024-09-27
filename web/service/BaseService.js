angular.module('myApp').service('BaeService', function ($rootScope, $path, HttpService, $path, $q) {
    return {
        getLangList: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/langList").then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getPOSTypeList: function () {
            const def = $q.defer();

            HttpService.get($path.url + "/api/POSTypeList/").then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getGenderList: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/genderList/").then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getKasusList: function (langId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/kasusList/"+langId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getLevelType: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelTypeList").then(function (result) {
                for(levelType of result){
                    if(levelType.levelTypeList)
                    levelType.levelTypeListObj = levelType.levelTypeList.split(",");
                }
                def.resolve(result);
            });
            return def.promise;
        },
        getValidityType: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/validityTypeList").then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getTenseList: function (langId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/tenseList/"+langId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getPronounList: function (langId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/pronounList/"+langId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getArticleList: function (langId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/articleList/"+langId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }
    }
});

