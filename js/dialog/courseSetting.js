angular.module('myApp').controller('courseLessonController', function ($rootScope, $scope, StorageService, LessonService, LevelService, $path) {
    $scope.viewerData = {};

    $scope.getCourseList = function () {
        LessonService.getCourseList($scope.selectedLang.langId).then(result => {
            console.log("getCourseList",result)
            $scope.current.courseList = result;
            StorageService.setData($scope.current);
        });
    };
    $scope.$on("userChanged", function () {
        $scope.current.lessonList = null;
        $scope.current.topicList = null;
        $scope.getCourseList();
    })

    $rootScope.$broadcast("userChanged");


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

    $scope.deleteCourse = function ($event, courseId) {
        if ($event.ctrlKey) {
            LessonService.deleteCourse(courseId).then(result => {
                $scope.getCourseList();
            });
        } else
            alert("press ctrl key for delete");
    }
    $scope.deleteLesson = function (lessonId) {
        courseId = $scope.current.selectedCourse.courseId;
        LessonService.deleteLesson(lessonId).then(result => {
            $scope.getLessonList(courseId);
        });
    }

    $scope.setCourse = function (course) {
        if (!$scope.viewerData)
            $scope.viewerData = {}
        $scope.viewerData.levelLexicalPhraseList = [];
        $scope.current.selectedCourse = course;
        $scope.current.topicList = null;
        // $scope.getLessonList(course.courseId);

        StorageService.setData($scope.current);
    }

    $scope.setLesson = function (lesson) {
        $scope.current.selectedLevelItem = undefined;
        $scope.viewerData.levelLexicalPhraseList = [];
        $scope.current.selectedCourse.selectedLesson = lesson;
        $rootScope.$broadcast('lessonChanged', lesson.lessonId);
        StorageService.setData($scope.current);
    }

    $scope.$watch('current.selectedCourse', function (newVal) {
        if (!newVal)
            return;
        $scope.getLessonList(newVal.courseId);
    });

    $scope.updateLesson = function () {
        title = $scope.current.selectedCourse.selectedLesson.title;
        lessonId = $scope.current.selectedCourse.selectedLesson.lessonId;
        params = [title, lessonId]
        LevelService.updateLesson(params).then(result => {

        })
    }
    $scope.updateCourse = function () {
        title = $scope.current.selectedCourse.title;
        courseId = $scope.current.selectedCourse.courseId;
        params = [title, courseId]
        LevelService.updateCourse(params).then(result => {

        });
    }

});
