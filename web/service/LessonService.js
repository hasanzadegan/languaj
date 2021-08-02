app.service('LessonService', function ($rootScope, $path, HttpService, StorageService, $q) {
    return {
        getTeacherList:function() {
            const def = $q.defer();
            HttpService.get($path.url + "/api/teacherList/").then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getCourseList:function(langId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/courseList/"+langId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getUserCourseList:function() {
            const def = $q.defer();
            HttpService.get($path.url + "/api/userCourseList").then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLessonList:function (courseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/lessonList/"+courseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLessonTopicList:function (courseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/lessonTopicList/"+courseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getViewerLessonTopicList:function (courseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/userLessonTopicList/"+courseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getUserLessonTopicList:function (userId,courseId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/teacherLessonTopicList/"+courseId+"/"+userId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getTopicList:function (lessonId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/topicList/"+lessonId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        changeLevelTopic:function(levelId,topicId){
            const def = $q.defer();
            HttpService.get($path.url + "/api/changeLevelTopic/"+levelId+"/"+topicId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLevelList:function (topicId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/levelList/"+topicId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }
        ,getReviewLevelList:function (topicId,review) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/reviewLevelList/"+topicId+"/"+review).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        getLevelById:function (levelId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/level/"+levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addCourse:function(course) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/addCourse",course).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addLesson:function (lesson) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/addLesson",lesson).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addTopic:function (topic) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/addTopic",topic).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addLevel:function (level) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/addLevel",level).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        pasteLevel:function (level) {
            const def = $q.defer();
            HttpService.post($path.url + "/api/pasteLevel",level).then(function (result) {
                console.log("pasteLevel>>>>>>>",result)
                def.resolve(result);
            })
            return def.promise;
        },
        deleteCourse:function(courseId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteCourse/"+courseId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteLesson:function (lessonId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteLesson/"+lessonId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteTopic:function (topicId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteTopic/"+topicId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        deleteLevel:function (levelId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/deleteLevel/"+levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        forceDeleteLevel:function (levelId) {
            const def = $q.defer();
            HttpService.delete($path.url + "/api/forceDeleteLevel/"+levelId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addAchievement:function(topicId,review){
            const def = $q.defer();
            HttpService.get($path.url + "/api/addAchievement/"+topicId+"/"+review).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        },
        addStudentCourse:function (courseCode,refUserId) {
            const def = $q.defer();
            HttpService.get($path.url + "/api/addStudentCourse/"+courseCode+"/"+refUserId).then(function (result) {
                def.resolve(result);
            })
            return def.promise;
        }
    }
});

