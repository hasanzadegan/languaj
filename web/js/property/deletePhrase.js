angular.module('myApp').controller('deletePhraseController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService) {
        $scope.deletePhrase = function ($event) {
            if(!$event.ctrlKey)
                return alert("press ctrl key for deleting");

            phrase = $scope.current.selectedPhrase;
            WordService.deletePhrase(phrase.phraseId).then(function (result) {
                $scope.findPhrase();
                StorageService.setData($scope.current);
            })
        }
    });