angular.module('myApp').controller('courseLessonController', function ($rootScope, $scope, StorageService, LessonService, LevelService, $path) {
    $scope.getCourseList = function () {
        LessonService.getCourseList($scope.selectedLang.langId).then(result => {
            console.log("getCourseList",result)
            $scope.current.courseList = result;
            StorageService.setData($scope.current);
        });
    };
    $scope.$on("userChanged", function () {
        $scope.current.lessonList = null;
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
        // todo $scope.selectedLang.langId -> teacher last save
        course = {
            sourceLangId: 1,
            destLangId: 2,
            title: title
        };

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

    $scope.deleteCourse = function ($event, courseCode) {
        if ($event.ctrlKey) {
            LessonService.deleteCourse(courseCode).then(result => {
                $scope.current.selectedCourse = null
                StorageService.setData($scope.current);
                $rootScope.$broadcast("userChanged");
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
        $scope.current.selectedCourse = course;
        StorageService.setData($scope.current);
    }

    $scope.setLesson = function (lesson) {
        $scope.current.selectedCourse.selectedLesson = lesson;
        $rootScope.$broadcast('lessonChanged', lesson.lessonId);
        StorageService.setData($scope.current);
    }

    $scope.$watch('current.selectedCourse', function (newVal) {
        if (!newVal)
            return;
        $scope.getLessonList(newVal.courseId);
    });

    $scope.updateLesson = function (lesson) {
        title = lesson.title;
        lessonId = lesson.lessonId;
        params = [title, lessonId]
        LevelService.updateLesson(params).then(result => {
            lesson.editMode = false;
        })
    }
    $scope.updateCourse = function (course) {
        params = [
            course.title,
            course.sourceLangId,
            course.destLangId,
            course.courseId,
        ];
        console.log(params)
        LevelService.updateCourse(params).then(result => {
            $rootScope.$broadcast("userChanged");

            course.editMode = false;
        });
    }

});
