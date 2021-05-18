angular.module('myApp').service('TeachService', function ($rootScope, $path, HttpService, $q) {
    return {
        getTopicTeachListWithLevelId:function(levelId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/topicTeachListWithLevelId/"+ levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTopicTeachList:function(topicId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/topicTeachList/"+ topicId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addTopicTeach:function(topicId,teachId){
            const def = $q.defer();
            HttpService.post($path.url + "/api/addTopicTeach/"+ topicId+"/"+teachId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteTopicTeach:function(topicTeachId){
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteTopicTeach/"+ topicTeachId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addTeach: function (param) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/addTeach", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteTeach: function (phraseId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteTeach/" + phraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        searchTeach: function (title) {
            const def = $q.defer();
            param = {title: title};
            HttpService.post($path.url + "/api/searchTeach", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTeach:function(teachId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/teach/"+teachId).then(function (result) {
                if(result.length>0)
                def.resolve(result[0]);
                else
                    def.resolve(null);
            })
            return def.promise;
        },
        updateTeach:function(teach){
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateTeach/",teach).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateLevelTeach:function(levelId,teachId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/updateLevelTeach/"+levelId+"/"+teachId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTeachPointList:function(teachId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/teachPointList/"+teachId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addTeachPoint:function(teachPoint){
            const def = $q.defer();
            HttpService.post($path.url + "/api/addTeachPoint/",teachPoint).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTeachPoint:function(teachPointId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/teachPoint/"+teachPointId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateTeachPoint:function(teachPoint){
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateTeachPoint",teachPoint).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteTeachPoint:function(teachPointId){
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteTeachPoint/"+teachPointId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
    }
});

