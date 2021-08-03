angular.module('myApp').controller('teacherController',
    function ($rootScope, $scope, $q, WordService, BaeService, StorageService, LessonService,LevelService, ArchiveService) {

        $scope.selectTeacher = function(teacher){
            $scope.current.selectedTeacher = teacher;
            $rootScope.$broadcast("teacherChanged", teacher);
            StorageService.setData($scope.current);
        }

        $scope.getCourseLessonList = function(course,$event){
            $scope.current.selectedCourse = course;
            StorageService.setData($scope.current)
            $rootScope.$broadcast("courseChanged",course.courseId);
        }
    });