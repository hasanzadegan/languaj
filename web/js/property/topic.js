angular.module('myApp').controller('topicController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, LevelService, LessonService) {
        $scope.deleteTopic = function (topic) {
            LessonService.deleteTopic(topic.topicId).then(result => {
                $scope.current.selectedCourse.selectedLesson.selectedTopic = null;
                $rootScope.$broadcast('lessonChanged', $scope.current.selectedCourse.selectedLesson.lessonId);
            });
        }
        $scope.updateTopic = function updateTopic(topic) {
            params = [topic.title, topic.orderr,topic.topicId];
            console.log(params)
            LevelService.updateTopic(params).then(result => {
                topic.editMode = false;
                $rootScope.$broadcast('lessonChanged', $scope.current.selectedCourse.selectedLesson.lessonId);
            })
        }
        $scope.addTopic = function (title) {
            lessonId = $scope.current.selectedCourse.selectedLesson.lessonId;
            topic = {
                lessonId: lessonId,
                title: title
            }
            LessonService.addTopic(topic).then(result => {
                $rootScope.$broadcast("lessonChanged", lessonId);
            });
        }

        $scope.setTopic = function (topic, $index) {
            // $scope.setPropertyPage('topic');
            $scope.current.selectedCourse.selectedLesson.selectedTopic = topic;
            $rootScope.$broadcast("topicChanged", topic.topicId);
            StorageService.setConfig($scope.config);
            $scope.current.showCourseSetting = false;
            StorageService.setData($scope.current);
        }
    });
