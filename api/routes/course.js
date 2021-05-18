const global = require('../routes/_global');
const lesson = require('../word/lesson');
const word = require('../word/word');

module.exports = function(app){

    app.post('/api/updateCourse', (req, res) => {
        lesson.updateCourse(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/updateLesson', (req, res) => {
        lesson.updateLesson(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/updateTopic', (req, res) => {
        lesson.updateTopic(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/updateLevel', (req, res) => {
        lesson.updateLevel(req.body).then(function (result) {
            res.send(result);
        })
    });
    app.post('/api/setLevelType', (req, res) => {
        lesson.setLevelType(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/courseList/:langId',  async (req, res) => {
        var user = await global.getUser(req);

        lesson.getCourseList(user.userId, req.params.langId).then(function (result) {
            courseList = [];
            for (course of result) {
                course.courseCode = global.getBase64(course.courseId);
                courseList.push(course);
            }

            res.send(courseList);
        })
    });

    app.get('/api/lessonList/:courseId',  (req, res) => {
        lesson.getLessonList(req.params.courseId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/lessonTopicList/:courseId',  async (req, res) => {
        var user = await global.getUser(req)
        lesson.getLessonTopicList(user.userId, req.params.courseId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/teacherLessonTopicList/:courseId/:teacherId',  async (req, res) => {
        var user = await global.getUser(req);
        teacherId = req.params.teacherId;
        lesson.getLessonTopicList(user.userId, req.params.courseId, teacherId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/topicList/:lessonId',  (req, res) => {
        lesson.getTopicList(req.params.lessonId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/changeLevelTopic/:levelId/:topicId',  (req, res) => {
        lesson.changeLevelTopic(req.params.levelId, req.params.topicId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/levelList/:topicId',  (req, res) => {
        lesson.getLevelList(req.params.topicId).then(function (result) {
            res.send(result);
        })
    });


    app.post('/api/addCourse', async (req, res) => {
        user = await global.getUser(req);
        params = [user.userId, req.body.langId, req.body.title];
        console.log(params)
        lesson.addCourse(params).then(function (result) {
            res.send(result);
        })
    });
    app.post('/api/addLesson', (req, res) => {
        params = [req.body.courseId, req.body.title];
        lesson.addLesson(params).then(function (result) {
            res.send(result);
        })
    });
    app.post('/api/addTopic', (req, res) => {
        params = [req.body.lessonId, req.body.title];
        lesson.addTopic(params).then(function (result) {
            res.send(result);
        })
    });
    app.post('/api/addLevel', (req, res) => {
        params = [
            req.body.levelTypeId,
            req.body.topicId,
            req.body.teachId,
            req.body.title,
            req.body.isActive,
            req.body.review,
        ];
        console.log("params>>>>>>>",params)
        lesson.addLevel(params).then(function (result) {
            res.send(result);
        })
    });
    app.post('/api/pasteLevel', (req, res) => {
        params1 = [
            req.body.levelTypeId,
            req.body.topicId,
            req.body.teachId,
            req.body.title,
            req.body.isActive,
            req.body.review,
        ];

        console.log(params1);
        lesson.addLevel(params1).then(function (result) {
            var prmiseList = [];
            for(levelLexicalPharase of req.body.levelLexicalPhraseList){
                prmiseList.push(new Promise((resolve,reject)=>{
                    params = [
                        result.insertId,
                        levelLexicalPharase.lexicalPhraseId,
                        levelLexicalPharase.itemJSON];
                    word.assignLevelLexicalPhrase(params).then(function (llresult) {
                        resolve("ok");
                    });
                }));
            }
            Promise.all(prmiseList).then((resolve)=>{
                res.send("ok");
            }).catch((reject)=>{
                console.log("error");
            })
        })
    });


    app.delete('/api/deleteCourse/:courseId', (req, res) => {
        lesson.deleteCourse(req.params.courseId).then(function (result) {
            res.send(result);
        }, function (error) {
            global.logger("/api/deleteCourse", error,req);
            res.send("error");
        })
    });
    app.delete('/api/deleteLesson/:lessonId', (req, res) => {
        lesson.deleteLesson(req.params.lessonId).then(function (result) {
            res.send(result);
        }, function (error) {
            global.logger("/api/deleteLesson", error,req);
            res.send("error");
        })
    });
    app.delete('/api/deleteTopic/:topicId', (req, res) => {
        lesson.deleteTopic(req.params.topicId).then(function (result) {
            res.send(result);
        })
    });
    app.delete('/api/deleteLevel/:levelId', (req, res) => {
        lesson.deleteLevel(req.params.levelId).then(function (result) {
            res.send(result);
        })
    });
    app.delete('/api/forceDeleteLevel/:levelId', (req, res) => {
        word.deleteLevelLexicalPhraseByLevel(req.params.levelId).then(result=>{
            lesson.deleteLevel(req.params.levelId).then(function (result) {
                res.send(result);
            })
        })
    });
}