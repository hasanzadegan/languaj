angular.module('myApp').controller('dictionaryController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService,$timeout,$interval) {
            $rootScope.addPhrase = function (phrase,langId) {
            console.log("$rootScope.addPhrase",phrase,langId)
            WordService.addPhrase(langId, phrase).then(result => {
                for(item of ["?",".","!"]){
                    result.title = result.title.replace(item," "+item);
                }
                $scope.selectPhrase(result);

                $scope.findPhrase();
            })
        }

        $rootScope.delayFindPhrase = function(){
            sourceLangId = $scope.current.selectedCourse.sourceLangId;
            destLangId = $scope.current.selectedCourse.destLangId;

            $scope.config.showSearchResult = true;
            phrase = $scope.current.searchText;
            $scope.current.didYouMean = false;

            WordService.searchPhrase(phrase,sourceLangId,destLangId).then(result => {
                $scope.current.phraseList = result;
                if(result.length===0){
                    $scope.current.phraseList = result;


                    WordService.searchSoundex(phrase,sourceLangId,destLangId).then(soundexResult=>{
                        $scope.current.didYouMean = true;
                        console.log("soundexResult.length",soundexResult.length,$scope.current.didYouMean)
                        $scope.current.phraseList = soundexResult;
                        StorageService.setConfig($scope.config);
                    })
                }
                else {
                    $scope.current.didYouMean = false;
                }
                StorageService.setData($scope.current);
            });
            StorageService.setConfig($scope.config);
        }

        var interval;
        $rootScope.findPhrase = function () {
            $rootScope.searchingPhrase = true;
            var c = 0;
            if(interval)
                $interval.cancel(interval);
            interval = $interval(function () {
                console.log("searching ...")
                if(c>3){
                    $interval.cancel(interval);
                    $rootScope.delayFindPhrase();
                    $rootScope.searchingPhrase = false;
                    console.log("search done ")
                }
                c++;
            },100);

        };

        $rootScope.selectPhrase = function (phrase) {
            $scope.current.selectedPhrase = phrase;
            $scope.current.viewerData.selectedLexicalPhrase = null;
            $rootScope.$broadcast("phraseSoundChanged",null);

            WordService.getPhraseWordList(phrase.phraseId).then(function (result) {
                $scope.current.selectedPhrase.phraseWordList = result;
                StorageService.setData($scope.current);
            })
            $scope.$broadcast("lexicalChanged",null);
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
