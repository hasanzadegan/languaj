angular.module('myApp').controller('pronounController',
    function ($rootScope, $scope,$q, BaeService,StorageService,WordService) {

        // $scope.current = StorageService.getData();


        $scope.setKasus = function (item) {
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;
            phraseWord.kasusId = item.kasusId;
            $scope.updatePhraseWord(phraseWord).then(result=>{
                StorageService.setData($scope.current);
            })
        }

        $scope.setPronoun = function (pronoun) {
            phraseWord = $scope.current.selectedPhrase.selectedPhraseWord;
            phraseWord.pronounId = pronoun.pronounId;
            WordService.updatePhraseWord(phraseWord).then(result=>{
                StorageService.setData($scope.current);
            })
        }
        BaeService.getPronounList($scope.current.selectedPhrase.selectedPhraseWord.langId).then(function (result) {
            kasusId = $scope.current.selectedPhrase.selectedPhraseWord.kasusId;
            for(item of result){
                if(item.kasusId===kasusId)
                    $scope.current.selectedPhrase.selectedPhraseWord.kasusTitle = item.title;
                item.pronounObj =JSON.parse(item.pronounList);
            }
            $scope.current.PronounList = result;
        });

    });