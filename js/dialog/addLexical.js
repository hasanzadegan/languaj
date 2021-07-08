angular.module('myApp').controller('addLexicalController',
    function ($rootScope, $scope, $q, WordService, BaeService,LessonService,LevelService,StorageService) {
        // console.log("extraParam",$scope.mdDialogData)

        $scope.assignLexicalPhrase = function(phraseId){
            $rootScope.$broadcast("assignLexical",phraseId,$scope.mdDialogData.relationTypeId);
        }


        $scope.findLexicalPhrase = function(){
            console.log("findLexicalPhrase",$scope.mdDialogData.langId)
            if($scope.current.lexical.searchText==undefined)
                return;
            phrase = $scope.current.lexical.searchText;
            WordService.searchPhrase(phrase).then(result => {
                $scope.current.lexical.phraseList = result;
                StorageService.setData($scope.current);
            });
        };


        $scope.addLexicalPhrase = function (phrase) {
            WordService.addPhrase($rootScope.selectedLang.langId, phrase).then(function (result) {
                $scope.findLexicalPhrase();
            });
        }


    });
