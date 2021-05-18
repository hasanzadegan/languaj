angular.module('myApp').controller('courseLessonController', function ($rootScope, $scope,StorageService,LessonService,$path) {

    LessonService.getCourseList($scope.selectedLang.langId).then(result => {
        $scope.current.courseList = result;
        StorageService.setData($scope.current);
    });

    $scope.getLessonList = function (courseId) {
        LessonService.getLessonList(courseId).then(result => {
            $scope.current.lessonList = result;
            StorageService.setData($scope.current);
        })
    }

    $scope.addCourse = function (title) {
        course = {
            langId: $scope.selectedLang.langId,
            title: title
        }
        LessonService.addCourse(course).then(result => {
            LessonService.getCourseList($scope.selectedLang.langId).then(result => {
                $scope.current.courseList = result;
                StorageService.setData($scope.current);
            })
        });
    }
    $scope.addLesson = function (title) {
        courseId = $scope.current.selectedCourse.courseId;
        lesson = {
            courseId: courseId,
            title: title
        }
        LessonService.addLesson(lesson).then(result => {
            $scope.getLessonList(courseId);
        });
    }

    $scope.deleteCourse = function () {
        courseId = $scope.current.selectedCourse.courseId;
        LessonService.deleteCourse(courseId).then(result => {
        });
    }
    $scope.deleteLesson= function (lessonId) {
        lessonId = $scope.current.selectedCourse.selectedLesson.lessonId;
        LessonService.deleteLesson(lessonId).then(result => {
        });
    }

    // $scope.setCourse = function (course) {
    //     $scope.current.selectedCourse = course;
    //     $scope.current.topicList = null;
    //     StorageService.setData($scope.current);
    // }
    $scope.setLesson = function (lesson) {
        $scope.current.selectedCourse.selectedLesson = lesson;
        StorageService.setData($scope.current);
    }

    $scope.$watch('current.selectedCourse', function (newVal) {
        if (!newVal)
            return;
        $scope.getLessonList(newVal.courseId);
    });


});
