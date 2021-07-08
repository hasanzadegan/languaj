angular.module('myApp').controller('teachDashboardController', function ($rootScope,
                                                                         $scope,
                                                                         StorageService,
                                                                         LevelService,
                                                                         LessonService,
                                                                         BaeService,
                                                                         WordService,
                                                                         ArchiveService,
                                                                         TeachService,
                                                                         $q,
                                                                         $timeout,
                                                                         $path) {


        $scope.selectTeach = function (teach) {
            $scope.selectedTeach = teach;
        }



        $scope.addTopicTeach = function (teach) {
            topicId = $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId;
            teachId = teach.teachId;
            TeachService.addTopicTeach(topicId,teachId).then(result => {
                $rootScope.$broadcast("topicChanged",topicId);
            });
        }

        $scope.deleteTopicTeach = function ($event,topic) {
            if ($event.ctrlKey) {
                TeachService.deleteTopicTeach(topic.topicTeachId).then(result => {
                    $rootScope.$broadcast("topicChanged", $scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);
                });
            } else {
                alert("press ctrl key for delete");
            }
        }

        $scope.$on('teachChanged', function (event, teach) {
            console.log("teachChanged",teach)
            // TeachService.getTopicTeachList(topicId).then(result => {
            //     console.log(result)
            //     $scope.current.selectedCourse.selectedLesson.selectedTopic.topicTeachList = result;
            //     StorageService.setData($scope.current)
            // })
        });

        $scope.$on("topicChanged",function (event,topicId) {
            TeachService.getTopicTeachList(topicId).then(result=>{
                $scope.current.selectedCourse.selectedLesson.selectedTopic.topicTeachList = result;
            })
        })

        if($scope.current.selectedCourse && $scope.current.selectedCourse.selectedLesson && $scope.current.selectedCourse.selectedLesson.selectedTopic)
            $rootScope.$broadcast("topicChanged",$scope.current.selectedCourse.selectedLesson.selectedTopic.topicId);

        $scope.loadTeach = function (teach) {
            TeachService.getTeach(teach.teachId).then(result=>{
                // $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedTeach = result;
                TeachService.updateLevelTeach($scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.levelId,teach.teachId).then(result=>{
                    $scope.current.selectedCourse.selectedLesson.selectedTopic.selectedLevel.teachId = teach.teachId;
                })
                $rootScope.$broadcast("teachChanged",result);
            })


            $rootScope.setPropertyPage('teach');
        }

        $scope.addTeach = function (title) {
            param = {title:title};
            // console.log(param)
            TeachService.addTeach(param).then(function (result){
            });
            $rootScope.setPropertyPage('teach');
        }

        $scope.editTeachRow = function($index){
            $scope.teachEditMode = $index;
        }

        $scope.editTopicTeach = function(item){
            TeachService.updateTeach(item).then(function (result) {
                $scope.teachEditMode = null;
            })
        }

        $scope.searchTeach = function () {
            const def = $q.defer();
            TeachService.searchTeach($scope.current.teach.title).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }
    }
);
