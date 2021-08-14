angular.module('myApp').controller('galleryController',
    function ($rootScope, $scope, $q, ArchiveService, WordService, BaeService, StorageService, $timeout, $interval) {

        $scope.reviewIndex = [null,1,2,3,4,5,6,7,8,9,10]
        $scope.loadUnreviewDoc = function () {
            ArchiveService.getUnreviewDoc().then(result => {
                $scope.current.unreviewList = result;
            });
        }

        $scope.loadUnreviewDoc();

        $scope.checkLexicalImage = function (item) {
            $scope.current.checkLexicalImage = item;
            $scope.current.galleryImagePath = '/api/media/'+$scope.current.checkLexicalImage.documentId+'?v='+getRand();
            StorageService.setData($scope.current);
        }

        $scope.uplaodFiles = function (imgId) {
            $scope.imgId = imgId;
            document.getElementById("file1").click();
        }

        $scope.allMode =  true;

        $scope.getLexicalImageList = function (lexical) {
            WordService.getLexicalImageList(lexical.lexicalId).then(imageListResult => {
                $scope.current.imageList = imageListResult;
            });
        }

        $scope.uploadImage = function ($files) {
            var f = $files[0];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var binaryData = e.target.result;
                    var base64String = window.btoa(binaryData);
                    docData = "data:" + f.type + ";base64," + base64String;
                    fileData = {docArchiveId: $scope.imgId, docData: docData}
                    $scope.current.galleryImagePath = docData;
                    ArchiveService.updateDocData(fileData).then(result => {
                        ArchiveService.getUnreviewDoc().then(result => {
                            $scope.current.unreviewList = result;
                        });

                        if ($scope.current.selectedLexical)
                            $scope.getLexicalImageList($scope.current.selectedLexical);
                    })
                };
            })(f);
            reader.readAsBinaryString(f);
        };


        $scope.acceptDoc = function ($event, doc) {
            if (!$event.ctrlKey)
                return alert("press ctrl for accept");

            if(doc.review == 99)
                doc.review = 0;
            doc.review = doc.review + 1;
            console.log(doc)
            ArchiveService.updateDocReview(doc).then(result => {
                $scope.loadUnreviewDoc();
                $scope.current.galleryImagePath = null;
            })
        }

        $scope.rejectDoc = function ($event, doc) {
            if (!$event.ctrlKey)
                return alert("press ctrl for accept");

            doc.review = 99;
            ArchiveService.updateDocReview(doc).then(result => {
                $scope.loadUnreviewDoc();
                $scope.current.galleryImagePath = null;
            })
        }

    })
