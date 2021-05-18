angular.module('myApp').controller('dictionaryController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService) {

        $rootScope.addPhrase = function (phrase) {
            WordService.addPhrase($rootScope.selectedLang.langId, phrase).then(result => {
                for(item of ["?",".","!"]){
                    result.title = result.title.replace(item," "+item);
                }
                $scope.selectPhrase(result);

                $scope.findPhrase();
            })
        }

        $rootScope.findPhrase = function () {
            $scope.config.showSearchResult = true;
            phrase = $scope.current.searchText;
            WordService.searchPhrase(phrase).then(result => {
                $scope.current.phraseList = result;
                if(result.length===0){
                    $scope.current.phraseList = result;
                    WordService.searchSoundex(phrase).then(soundexResult=>{
                        $scope.current.phraseList = soundexResult;
                        if(soundexResult.length===0)
                            $scope.current.didYouMean = false;
                        else
                            $scope.current.didYouMean = true;
                        StorageService.setConfig($scope.config);
                    })
                }
                else {
                    $scope.current.didYouMean = false;
                }
                StorageService.setData($scope.current);
            });
            StorageService.setConfig($scope.config);
        };

        $rootScope.selectPhrase = function (phrase) {
            $scope.current.selectedPhrase = phrase;
            $scope.current.selectedLexicalPhrase = null;
            $rootScope.$broadcast("phraseSoundChanged",null);

            WordService.getPhraseWordList(phrase.phraseId).then(function (result) {
                $scope.current.selectedPhrase.phraseWordList = result;
                StorageService.setData($scope.current);
            })
            WordService.getLexicalOtherPhraseList(phrase.phraseId).then(function (result) {
                // $scope.current.selectedPhrase.relationLexicalList[0].lexicalObj
                $scope.current.selectedPhrase.relationLexicalList = result;

                if(result.length>0) {
                    lexicalListObj = JSON.parse(result[0].lexicalList);
                    $rootScope.$broadcast("lexicalImageChanged", {lexicalId: result[0].lexicalId});
                }
                else {
                    // $scope.extractPhrase(phrase).then(result=>{})
                }
                StorageService.setData($scope.current);
            });
        }

        $scope.deletePhrase = function ($event) {
            if(!$event.ctrlKey)
                return alert("press ctrl key for deleting");
            phrase = $scope.current.selectedPhrase;
            WordService.deletePhrase(phrase.phraseId).then(function (result) {
                $scope.findPhrase();
                StorageService.setData($scope.current);
            })
        }

        $scope.extractPhrase = function (phrase) {
            const def = $q.defer();
            WordService.extractPhrase(phrase).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }

        $scope.clearPhrase = function () {
            //$scope.current.selectedPhrase = null;
            //StorageService.setData($scope.current);
        }

        $rootScope.selectPhraseWord = function (phraseWord) {
            WordService.getPhraseWordById(phraseWord.phraseWordId).then(result=>{
                $scope.current.selectedPhrase.selectedPhraseWord = result[0];
                StorageService.setData($scope.current);
                $scope.config.showGrammer = true;
                StorageService.setConfig($scope.config);
            })
        }

        $scope.selectFullPhrase = function(){
            $scope.current.selectedPhrase.selectedPhraseWord = null;
            StorageService.setData($scope.current);
        }

        $scope.setLexicalPropertyPage = function (relationtypeId) {
            $scope.current.selectedRelationTypeId = relationtypeId;
        }

        $scope.selectLexicalType = function (lexicalType) {
            relationtype={'translate':1,'synonym':2,'opposite':3}
            $scope.current.selectedRelationTypeId = relationtype[lexicalType];
            $scope.current.selectedLexicalType = lexicalType;
            StorageService.setData($scope.current);
        }

        // $scope.toggleLexical = function(){
        //     $scope.config.showLexical = !$scope.config.showLexical;
        //     StorageService.setConfig($scope.config);
        // }

        $scope.toggleSearchResult = function(){
            $scope.config.showSearchResult = !$scope.config.showSearchResult;
            StorageService.setConfig($scope.config);
        }

        $scope.toggleGrammer = function(){
            $scope.config.showGrammer = !$scope.config.showGrammer;
            StorageService.setConfig($scope.config);
        }
        //
        // $scope.toggleImage = function(){
        //     // $scope.config.showImage= !$scope.config.showImage;
        //     // StorageService.setConfig($scope.config);
        // }

        $scope.selectedLexical = function (lexical) {
            $scope.current.selectedPhrase.selectedLexical = lexical;
            StorageService.setData($scope.current)
        }


        $scope.updatePhraseWord = function(phraseWord){
            // console.log("updatePhraseWord",phraseWord)
            const def = $q.defer();
            WordService.updatePhraseWord(phraseWord).then(result=>{
                def.resolve(result);
                StorageService.setData($scope.current);
            })
            return def.promise;
        }

        $scope.updatePhrase = function(){
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;
            const def = $q.defer();
            WordService.updatePhrase(phraseWord).then(result=>{
                def.resolve(result);
                StorageService.setData($scope.current);
            })
            return def.promise;
        }

        $scope.config.editMode = {};
        $scope.updatePhraseTitle = function(phrase){
            WordService.updatePhraseTitle(phrase).then(result=>{
                $scope.config.editMode[phrase.phraseId]=!$scope.config.editMode[phrase.phraseId]
            })
        }
    })