angular.module('myApp').controller('lessonListController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, LessonService, ArchiveService) {

        $scope.LessonTopicList = null;



        $scope.$on("teacherChanged", function (event, teacher) {
            $scope.LessonTopicList = null;
        });

        $scope.$on("courseChanged", function (event, courseId) {
            firstTopic = true;
            $scope.current.courseId = courseId;
            StorageService.setData($scope.current);
            teacherId = Number(location.search.split("teacherId=")[1]);
            if(teacherId)
                LessonService.getUserLessonTopicList(teacherId,courseId).then(result => {
                    for (item of result) {
                        item.topicListObj = JSON.parse(item.topicList);
                        for (topic of item.topicListObj) {
                            if (topic.achievedTopicId !== null) {
                                topic.locked = false;
                                topic.achieved = true;
                            } else {
                                if (firstTopic) {
                                    topic.locked = false;
                                    firstTopic = false;
                                } else {
                                    topic.locked = true;
                                }
                            }
                        }
                    }
                    $scope.LessonTopicList = result;
                })
            else
                LessonService.getLessonTopicList(courseId).then(result => {
                for (item of result) {
                    item.topicListObj = JSON.parse(item.topicList);
                    for (topic of item.topicListObj) {
                        if (topic.achievedTopicId !== null) {
                            topic.locked = false;
                            topic.achieved = true;
                        } else {
                            if (firstTopic) {
                                topic.locked = false;
                                firstTopic = false;
                            } else {
                                topic.locked = true;
                            }
                        }
                    }
                }
                $scope.LessonTopicList = result;
            })
        });

        if($scope.current.selectedCourse!=null){
            $rootScope.$broadcast("courseChanged",$scope.current.selectedCourse.courseId);
        }

        $scope.getTopicLevelList = function (topic) {
            $scope.current.selectedCourse.selectedTopic = topic;
            // $scope.current.selectedTopic = topic;
            LessonService.getLevelList(topic.topicId).then(result => {
                $scope.current.levelList = result;
                $scope.current.student.selectedCourse.selectedTopic = 0;
                StorageService.setData($scope.current);
                $scope.config.footerIcon='studentLevel';
                if ($scope.current.levelList.length > 0) {
                    $scope.selectStudentLevel($scope.current.levelList[$scope.current.student.selectedCourse.selectedTopic].levelId);
                }
            })
        }





    });