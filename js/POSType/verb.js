angular.module('myApp').controller('verbController',
    function ($rootScope, $scope,$q, WordService,BaeService, StorageService,VerbService) {

        $scope.current = StorageService.getData();

        BaeService.getTenseList(langId).then(result => {
            $scope.tenseList = result;
        })
        BaeService.getTenseList(2).then(function (result) {
            $scope.current.tenseList = result;
        });

        $scope.unLockConjugation = function(){
            $scope.current.editConjugation = !$scope.current.editConjugation;
            StorageService.setData($scope.current);
        }

        $scope.loadConjugation = function(infinitiveId,tenseId){
            WordService.getInfinitive(infinitiveId).then(result=>{
                $scope.current.selectedInfinitive = result;
            })
            WordService.getConjugationList(infinitiveId,tenseId)
                .then(function (result) {
                    for(item of result)
                    {
                        item.conjugationObj =(JSON.parse(item.conjugationList));
                    }
                    $scope.current.selectedPhrase.selectedPhraseWord.conjugationList = result;
                    StorageService.setData($scope.current);
                })
        }

        $scope.setTense = function (tense) {
            $scope.current.selectedPhrase.selectedPhraseWord.tenseId = tense.tenseId;
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;

            $rootScope.$broadcast('conjugationConditionChanged',[tense.tenseId,phraseWord.infinitiveId]);
            $scope.updatePhraseWord(phraseWord).then(result=>{
                StorageService.setData($scope.current);
            })
        }

        $scope.$on('conjugationConditionChanged', function (event,data) {
            // console.log("conjugationConditionChanged",$scope.current.selectedPhrase.selectedPhraseWord)
            phraseWordId = $scope.current.selectedPhrase.selectedPhraseWord.phraseWordId;
            WordService.getPhraseWordById(phraseWordId).then(result=>{
                $scope.current.selectedPhrase.selectedPhraseWord = result[0];
                $scope.loadConjugation(result[0].infinitiveId,result[0].tenseId);
            })
        });

        $rootScope.$broadcast('conjugationConditionChanged',null);

        $scope.addInfinitive = function(text){
            // console.log("addInfinitive")
            // VerbService.addInfinitive()
        }

        $scope.selectConjugation = function(conjugation){
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;
            phraseWord.pronounId = conjugation.pronounId;

            $rootScope.$broadcast('conjugationConditionChanged',null);
            $scope.updatePhraseWord(phraseWord).then(result=>{
                StorageService.setData($scope.current);
            });
        };


        $scope.searchInfinitive = function() {
            infinitive = $scope.current.infinitive;
            const def = $q.defer();
            WordService.searchInfinitive(infinitive.title).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }


        $scope.selectInfinitive = function(infinitive){
            if(infinitive===undefined)
                return;
            $scope.current.selectedPhrase.selectedPhraseWord.infinitiveId = infinitive.infinitiveId;
            StorageService.setData($scope.current);

            $scope.updatePhraseWord($scope.current.selectedPhrase.selectedPhraseWord).then(result=>{
                $rootScope.$broadcast('conjugationConditionChanged',null);
            });
        }



        $scope.changeTense = function () {
            $rootScope.$broadcast('conjugationConditionChanged',null);
        }

        $scope.updateConjugation = function(congugation){
            infinitiveId = $scope.current.selectedPhrase.selectedPhraseWord.infinitiveId;
            tenseId = $scope.current.selectedPhrase.selectedPhraseWord.tenseId;
            VerbService.updateConjugation(infinitiveId,tenseId,congugation.pronoungroupId,congugation.title)
                .then(result=>{
                    // console.log("updateConjugation",result);
                });

        }
    });