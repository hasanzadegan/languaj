angular.module('myApp').controller('nounController',
    function ($rootScope, $scope,$q, BaeService,StorageService) {

        $scope.current = StorageService.getData();

        BaeService.getArticleList($scope.current.selectedPhrase.selectedPhraseWord.langId).then(function (result) {
            for(item of result){
                item.articleObj =JSON.parse(item.articleList);
            }

            $scope.current.articleList = result;
        });
    });