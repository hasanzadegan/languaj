app.service('LevelService', function ($rootScope, $path, HttpService, StorageService, $q) {
    return {
        getLevelLexicalPhraseList:function(levelId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelLexicalPhraseList/"+levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLevelLexicalPhraseSoundList:function(levelId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelLexicalPhraseSoundList/"+levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLevelLexicalPhraseById:function(levelLexicalPhraseId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelLexicalPhrase/"+levelLexicalPhraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateLevelLexicalJson:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateLevelLexicalJson",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        assignLevelLexicalPhrase:function(levelId,lexicalPhraseId,itemJSON){
            const def = $q.defer();
            params = [levelId,lexicalPhraseId,itemJSON];
            HttpService.post($path.url + "/api/assignLevelLexicalPhrase",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getOriginLexicalPhrase:function(lexicalId,phraseId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/originLexicalPhrase/"+lexicalId+"/"+phraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteLevelLexicalPhrase:function(levelLexicalPhraseId){
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteLevelLexicalPhrase/"+levelLexicalPhraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateCourse:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateCourse",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateLesson:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateLesson",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateTopic:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateTopic",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updateLevel:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updateLevel",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        setLevelType:function(params) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/setLevelType",params).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
    }
});

