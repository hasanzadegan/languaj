angular.module('myApp').controller('lexicalController',
    function ($rootScope, $scope, $q, $mdDialog, WordService, BaeService, StorageService,LevelService,ArchiveService) {



        $scope.getLexicalOtherPhraseList = function () {
            if($scope.current.selectedPhrase===undefined || $scope.current.selectedPhrase==null)
                return;
            wordId = $scope.current.selectedPhrase.phraseId;
            $scope.current.selectedPhrase.phraseWordLexicalList = [];
            WordService.getLexicalOtherPhraseList(wordId).then(function (result) {
                $scope.current.selectedPhrase.relationLexicalList = result;
                StorageService.setConfig($scope.current);


                var translateLangId;
                var otherLangId;
                if($scope.current.selectedCourse.sourceLangId == $scope.current.selectedPhrase.langId)
                {
                    translateLangId = $scope.current.selectedCourse.destLangId;
                    otherLangId = $scope.current.selectedCourse.sourceLangId;
                }else {
                    translateLangId = $scope.current.selectedCourse.sourceLangId;
                    otherLangId = $scope.current.selectedCourse.destLangId;
                }



                $scope.relationTypeList = {
                    1:{relationTypeId:1,title:"translate",icon:"translate",
                        langId:translateLangId
                    },
                    2:{relationTypeId:2,title:"synonym",icon:"text_fields",
                        langId:otherLangId
                    },
                    3:{relationTypeId:3,title:"opposite",icon:"import_export",
                        langId:otherLangId
                    },
                    // 4:{relationTypeId:4,title:"plural or singular",icon:"hdr_strong"},
                    // 5:{relationTypeId:5,title:"singular",icon:"hdr_weak"},
                }

                console.log("course sourceLangId => ",$scope.current.selectedCourse.sourceLangId)
                console.log("course destLangId => ",$scope.current.selectedCourse.destLangId)
                console.log("phrase langId => ",$scope.current.selectedPhrase.langId)
                console.log("phrase isSourceLang => ",$scope.isSourceLang)

            })
        }

        $scope.getLexicalOtherPhraseList();


        $scope.$on('lexicalChanged', function (event, data) {
            $scope.getLexicalOtherPhraseList();
        });

        $scope.$on("assignLexical", function (event, phraseId1,relationTypeId) {
            phraseId2 = $scope.current.selectedPhrase.phraseId;
            WordService.assignLexicalPhrase(relationTypeId,phraseId1,phraseId2).then(result=>{
                $scope.getLexicalOtherPhraseList();
            });
        })

        $scope.showImage= function(lexicalPhrase,relation){
            $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.selectedLexicalPhrase = lexicalPhrase;
            StorageService.setData($scope.current);
            lexicalPhrase.lexicalId = relation.lexicalId;
            $scope.toggleImageList();
            $rootScope.$broadcast("lexicalImageChanged",lexicalPhrase);
            StorageService.setConfig($scope.config);
        }

        $scope.toggleImageList = function(){
            if(!$scope.config.showImage)
                $scope.config.showImage = true;
            else
                $scope.config.showImage = false;
            // StorageService.setConfig($scope.config);
        }


        $scope.assignLevelLexicalPhrase = function(lexicalPhrase,lexicalId){
            LevelService.getOriginLexicalPhrase(lexicalId,$scope.current.selectedPhrase.phraseId).then(baseResult=>{
                baseLexicalPhraseId = baseResult[0].lexicalPhraseId;
                itemJSON  =  {showText:"true",
                    showText:true,
                    soundId:null,
                    imageId:null,
                    validityTypeId:3,
                    animation:'heartbeat',
                    itemFlex:50,
                    phraseWordHint:{},
                    title:$scope.current.selectedPhrase.title,
                    wordList:$scope.current.selectedPhrase.phraseWordList,
                    lexicalPhrase:lexicalPhrase,
                };
                itemJSON = JSON.stringify(itemJSON);

                levelId = $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelId;
                LevelService.assignLevelLexicalPhrase(levelId,baseLexicalPhraseId,itemJSON).then(result=>{
                    $rootScope.$broadcast('levelChanged', levelId);
                });
            })
        }

        $scope.deleteLexicalPhrase = function ($event,lexical) {
            if(!$event.ctrlKey)
                return alert("press ctrl key for deleting");
            WordService.deleteLexicalPhrase(lexical.lexicalphraseId).then(result => {
                $scope.getLexicalOtherPhraseList();
            });
        }



        $scope.uplaodFiles = function(){
            document.getElementById("file1").click()
        }

        $scope.uploadImage = function ($files) {
            var f = $files[0];
            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    var binaryData = e.target.result;
                    var base64String = window.btoa(binaryData);
                    docData = "data:"+f.type+";base64,"+base64String;
                    fileData = {docData:docData}
                    // console.log(fileData);
                    ArchiveService.saveDoc(fileData).then(imageResult=>{
                        WordService.addLexicalImage($scope.current.selectedLexical.lexicalId,imageResult.insertId).then(lexicalImageResult=>{
                            $rootScope.$broadcast("lexicalImageChanged", $scope.current.selectedLexical);
                            StorageService.setData($scope.current);
                        })
                    });
                };
            })(f);
            reader.readAsBinaryString(f);
        };

    });
