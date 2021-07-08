angular.module('myApp').service('WordService', function ($rootScope, $path, HttpService, $q) {
    return {
        searchPhrase: function (phrase) {
            const def = $q.defer();
            param = {
                title: phrase,
                sourceLangId:sourceLangId,
                destLangId:destLangId
            };

            HttpService.post($path.url + "/api/searchPhrase", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        searchSoundex: function (phrase,sourceLangId,destLangId) {
            const def = $q.defer();
            param = {
                title: phrase,
                sourceLangId:sourceLangId,
                destLangId:destLangId
            };
            HttpService.post($path.url + "/api/searchSoundex", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getPhraseById: function (phraseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/phrase/" + phraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getPhraseWordById: function (phraseWordId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/phraseWord/" + phraseWordId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addPhrase: function (langId, phrase) {
            const def = $q.defer();
            param = {langId: langId, title: phrase};
            HttpService.post($path.url + "/api/addPhrase", param).then(function (result) {
                HttpService.get($path.url + "/api/phrase/" + result.insertId).then(phraseResult => {
                    def.resolve(phraseResult[0]);
                })
            })
            return def.promise;
        },
        deletePhrase: function (phraseId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deletePhrase/" + phraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        extractPhrase: function (phrase) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/extractPhrase", phrase).then(function (result) {
                // console.log("extractPhrase", result)

            })
            return def.promise;
        },
        searchInfinitive: function (infinitive) {
            const def = $q.defer();
            param = {title: infinitive};
            // console.log(param)
            HttpService.post($path.url + "/api/searchInfinitive", param).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getPhraseWordList: function (phraseId) {
            const def = $q.defer();
            if (phraseId === undefined)
                def.resolve([])
            else {
                HttpService.get($path.url + "/api/phraseWordList/" + phraseId).then(function (result) {
                    def.resolve(result);
                })
            }
            return def.promise;
        },
        updatePhraseWord: function (phraseWord) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updatePhraseWord/", phraseWord).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updatePhrase: function (phraseWord) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updatePhrase", phraseWord).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        updatePhraseTitle: function (phrase) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/updatePhraseTitle", phrase).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLexicalOtherPhraseList: async function (phraseId) {
            if(!phraseId)
                return null;
            const def = $q.defer();
            if (phraseId === undefined)
                def.resolve([]);
            else {
                HttpService.get($path.url + "/api/lexicalOtherPhraseList/" + phraseId).then(function (result) {
                    for (lex of result) {
                        lex.lexicalObj = JSON.parse(lex.lexicalList);
                    }
                    def.resolve(result);
                });
            }
            return def.promise;
        },
        getLexicalImageList: async function (lexicalId) {
            if(lexicalId===undefined)
                return ;
            const def = $q.defer();
            HttpService.get($path.url + "/api/lexicalImageList/" + lexicalId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getLevelImageList: async function (levelId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelImageList/" + levelId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        getPhraseSoundList: async function (phraseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/phraseSoundList/" + phraseId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        addLexicalImage: async function (lexicalId,imageId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/addLexicalImage/" + lexicalId+"/"+imageId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        addPhraseSound: async function (phraseId,soundId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/addPhraseSound/" + phraseId+"/"+soundId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        deleteLexicalImage: async function (lexicalId,imageId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteLexicalImage/" + lexicalId+"/"+imageId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        deletePhraseSound: async function (phraseId,soundId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deletePhraseSound/" + phraseId+"/"+soundId).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        assignLexicalPhrase: function (relationTypeId, phraseId1, phraseId2) {
            const def = $q.defer();
            params = {
                "relationTypeId": relationTypeId,
                "phraseId1": phraseId1,
                "phraseId2": phraseId2
            };
            // console.log(params);
            HttpService.post($path.url + "/api/assignLexical/", params).then(function (result) {
                def.resolve(result);
            });
            return def.promise;
        },
        deleteLexicalPhrase: function (lexicalPhraseId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteLexicalPhrase/" + lexicalPhraseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getInfinitive: function (infinitiveId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/infinitive/" + infinitiveId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTense: function (tenseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/tense/" + tenseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getConjugationList: function (infinitiveId, tenseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/conjugationList/" + tenseId + "/" + infinitiveId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
    }
});

