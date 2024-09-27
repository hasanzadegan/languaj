angular.module('myApp').controller('imageListController',
    function ($rootScope, $scope, $q, WordService, BaeService, LessonService, LevelService, StorageService, ArchiveService) {


        $scope.getLexicalImageList = function (lexical) {
            if(lexical===undefined)
                return;
            WordService.getLexicalImageList(lexical.lexicalId).then(imageListResult => {
                $scope.current.imageList = imageListResult;
                // ArchiveService.getImageList(imageListResult).then(result => {
                //     $scope.current.imageList = result;
                // })
            });
            $scope.current.selectedLexical = lexical;
            StorageService.setData($scope.current)
        }

        $scope.getLexicalImageList($scope.current.selectedLexical);

        $scope.$on("lexicalImageChanged", function (event, lexical) {
            $scope.getLexicalImageList(lexical);
        });

        $scope.deleteDoc = function ($event,docArchiveId) {
            if(!$event.ctrlKey)
                return alert("press ctrl key for deleting");

            ArchiveService.deleteDoc(docArchiveId).then(result => {
                lexical = $scope.current.selectedLexical;
                WordService.deleteLexicalImage(lexical.lexicalId,docArchiveId).then(deleteResult=>{
                    $rootScope.$broadcast("lexicalImageChanged", lexical);
                    StorageService.setData($scope.current);
                })
            })
        }

    });

