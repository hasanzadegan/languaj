app.service('ArchiveService', function ($rootScope, $path, HttpService, StorageService, $q) {
    return {
        saveDoc: function (doc) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/saveDoc",doc).then(result=> {
                    def.resolve(result);
                },
                error =>{selectLevelItem(levelItem)
                    def.reject(error);
                }
            );
            return def.promise;
        },
        getUnreviewDoc: function () {
            const def = $q.defer();
            HttpService.get($path.url + "/api/UnreviewDoc").then(result=> {
                    for(item of result){
                        try {
                            item.lexicalListObj = JSON.parse(item.lexicalList);
                        }catch (e) {}
                    }
                    console.log(result)
                    def.resolve(result);
                },
                error =>{
                    def.reject(error);
                }
            );
            return def.promise;
        },
        updateDocData: function (doc) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateDocData",doc).then(result=> {
                    def.resolve(result);
                },
                error =>{
                    def.reject(error);
                }
            );
            return def.promise;
        },
        updateDocReview: function (doc) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateDocReview",doc).then(result=> {
                    def.resolve(result);
                },
                error =>{
                    def.reject(error);
                }
            );
            return def.promise;
        },

        getDoc: function (docId) {
            const def = $q.defer();
            if(docId>0){
                HttpService.get($path.url + "/api/doc/"+docId).then(result=> {
                        def.resolve(result);
                    },
                    function (error) {
                        def.reject(error);
                    }
                );
            }
            else{
                def.reject("null doc Id");
            }
            return def.promise;
        },
        deleteDoc: function (docId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteDoc/"+docId).then(result=> {
                    def.resolve(result);
                },
                function (error) {
                    def.reject(error);
                }
            );
            return def.promise;
        },
        getImageList: function (imageList) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/imageList",imageList).then(result=> {
                    def.resolve(result);
                },
                function (error) {
                    def.reject(error);
                }
            );
            return def.promise;
        }
    }
});


// actionPath = $path.actions.archive.getDoc+'/'+docId;
// const def = $q.defer();
// HttpService.get(actionPath).then(
//     function (result) {
//         def.resolve(result);
//     },
//     function (error) {
//         def.reject(error);
//     }
// );
// return def.promise;
