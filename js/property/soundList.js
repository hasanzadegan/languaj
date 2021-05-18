angular.module('myApp').controller('soundListController', function ($rootScope, $scope, StorageService, ArchiveService, WordService, SoundService, $path) {
    $scope.uplaodFiles = function () {
        document.getElementById("fileSound").click()
    }

    $scope.deleteSound = function ($event,soundId) {
        if(!$event.ctrlKey)
            return alert("press ctrl key for deleting");
        ArchiveService.deleteDoc(soundId).then(result => {
            WordService.deletePhraseSound($scope.current.selectedPhrase.phraseId, soundId).then(result => {
                $rootScope.$broadcast("phraseSoundChanged",null);
                StorageService.setData($scope.current)
                // $scope.getPhraseSoundList();
            })
        });
    }

    $scope.getPhraseSoundList = function () {
        $scope.current.soundList = [];
        WordService.getPhraseSoundList($scope.current.selectedPhrase.phraseId).then(soundListResult => {
            $scope.current.soundList = soundListResult;
            StorageService.setData($scope.current)
        });
    }


    $scope.$on("phraseSoundChanged", function (event, lexical) {
        $scope.getPhraseSoundList()
    });

    // ;

    $scope.getTheFiles = function ($files) {
        var f = $files[0];
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var binaryData = e.target.result;
                var base64String = window.btoa(binaryData);
                docData = "data:" + f.type + ";base64," + base64String;
                fileData = {docData: docData}
                ArchiveService.saveDoc(fileData).then(result => {
                    WordService.addPhraseSound($scope.current.selectedPhrase.phraseId, result.insertId).then(lexicalImageResult => {
                        $scope.getPhraseSoundList();
                    })
                });
            };
        })(f);
        reader.readAsBinaryString(f);
    };

});
