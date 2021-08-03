angular.module('myApp').controller('grammerController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService) {
        // console.log("grammerController")

        BaeService.getGenderList().then(result => {
            $scope.genderList = result;
        })
        BaeService.getPOSTypeList().then(result => {
            $scope.POSTypeList = result;
        });

        $scope.$on("pluralSet", function () {
            // if($scope.current.selectedPhrase.selectedPhraseWord!==null){
            //     // console.log("$scope.current.selectedPhrase.selectedPhraseWord.phraseId",$scope.current.selectedPhrase.selectedPhraseWord.phraseId)
            //     WordService.getLexicalOtherPhraseList($scope.current.selectedPhrase.selectedPhraseWord.phraseId).then(result => {
            //         var pluralList = [];
            //         if(result.length>0){
            //             // if(result[0].relationTypeId===4)
            //             {
            //                 console.log(result[0])
            //                 for (item of result[0].lexicalObj) {
            //                     if ($scope.current.selectedPhrase.selectedPhraseWord.phraseId !== item.phraseId)
            //                         pluralList.push(item);
            //                 }
            //                 if (pluralList.length > 0)
            //                     $scope.current.singlarItem = pluralList[0];
            //             }
            //         }
            //     })
            // }
        });
        $rootScope.$broadcast("pluralSet");

        //todo
        langId = $scope.selectedLang.langId;

        $scope.setGender = function (gender) {
            $scope.current.selectedPhrase.selectedPhraseWord.genderId = gender.genderId;
            $scope.current.selectedPhrase.selectedPhraseWord.genderTitle = gender.title;
            StorageService.setData($scope.current);
            $scope.updatePhrase().then(result => {
                $rootScope.$broadcast("pluralSet");
            })
        }
        $scope.setPOSType = function (POSType) {
            $scope.current.selectedPhrase.selectedPhraseWord.POSTypeId = POSType.POSTypeId;
            $scope.current.selectedPhrase.selectedPhraseWord.POSTitle = POSType.title;
            StorageService.setData($scope.current);
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;
            $scope.updatePhraseWord(phraseWord).then(result => {
                // console.log(result);
            })
        }

        $scope.savePlural = function(word,plural){
            console.log(word,plural)
        }
        $scope.setInfinitive = function (infinitiveId) {
            $scope.current.selectedPhrase.selectedPhraseWord.infinitiveId = infinitiveId;
            StorageService.setData($scope.current);
            $rootScope.$broadcast('conjugationConditionChanged', [phraseWord.tenseId, infinitiveId]);
            // console.log(infinitiveId)
        }
        $scope.setArticle = function (articleId) {
            $scope.current.selectedPhrase.selectedPhraseWord.articleId = articleId;
        }

    });