angular.module('myApp').controller('courseListController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, LessonService, ArchiveService) {

        if (!$scope.current.student) {
            $scope.current.student = {};
        }

        $scope.loadCourseList = function () {
            $scope.getUserCourseList();
            $scope.current.student.selectedCourse = null;
        }

        $scope.$on("courseChanged", function (event, courseId) {
            firstTopic = true;
            LessonService.getViewerLessonTopicList(courseId).then(result => {
                for (item of result) {
                    item.topicListObj = JSON.parse(item.topicList);
                    for (topic of item.topicListObj) {
                        console.log(">>>>>>>>>>>>",topic.review)
                        // if (topic.achievedTopicId !== null) {
                        if (topic.review >=5) {
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
                $scope.current.student.selectedCourse.lessonList = result;
                StorageService.setData($scope.current);
            })
        })

        $scope.setCourse = function (course) {
            $scope.current.student = {};
            $scope.current.student.selectedCourse = course;
            StorageService.setData($scope.current);
            $rootScope.$broadcast("courseChanged", $scope.current.student.selectedCourse.courseId);
        }

        $scope.getUserCourseList = function () {
            $scope.current.student.courseList = null;
            LessonService.getUserCourseList().then(result => {
                $scope.current.student.courseList = result;
                console.log("***********",result);
                var hasCourseInList = result.filter(function (course) {
                    return course.courseCode == $scope.current.courseCode;
                })

                if ($scope.current.courseCode && hasCourseInList.length === 0) {
                    LessonService.addStudentCourse($scope.current.courseCode, $scope.current.profile.ref).then(result => {
                        localStorage.removeItem("current.courseCode");
                        $scope.getUserCourseList();
                    });
                }
                StorageService.setData($scope.current);
            })
        }


        $scope.getTopicLevelList = function (topic,review) {
            console.log("review",review)
            $scope.current.student.selectedCourse.selectedTopic = topic;
            $scope.current.student.selectedCourse.selectedTopic.levelList = [];

            LessonService.getReviewLevelList(topic.topicId,review??1).then(result => {
                if (result.length > 0) {
                    $scope.current.student.selectedCourse.selectedTopic.levelList = result;
                    $scope.current.student.selectedCourse.selectedTopic.levelIndex = 0;
                    StorageService.setData($scope.current);
                    $scope.config.footerIcon = 'footerStudent';
                    StorageService.setConfig($scope.config);
                    $scope.selectStudentLevel(result[0].levelId);
                }
            })
        }

        $scope.getUserCourseList();
        if ($scope.current.student.selectedCourse)
            $scope.setCourse($scope.current.student.selectedCourse);

        $scope.addStudentCourse = function (courseCode) {
            LessonService.addStudentCourse(courseCode, $scope.current.profile.ref).then(result => {
                $scope.getUserCourseList();
            });
        }


    });