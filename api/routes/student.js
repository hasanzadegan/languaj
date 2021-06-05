const global = require('../routes/_global');
const teach = require('../teach/teach');
const lesson = require('../word/lesson');
const word = require('../word/word');

module.exports = function(app){

    app.get('/api/addStudentCourse/:courseCode/:refUserId',  async (req, res) => {
        var user = await global.getUser(req);
        var courseId = global.base64ToInt(req.params.courseCode);
        var refUserId = global.base64ToInt(req.params.refUserId);
        if (courseId < 0)
            res.send("code is incorrect")
        else {
            lesson.addStudentCourse(user.userId, courseId, refUserId).then(function (result) {
                res.send(result);
            })
        }
    });

    app.get('/api/userCourseList',  async (req, res) => {
        user = await global.getUser(req);
        if(user){
            lesson.getUserCourseList(user.userId).then(function (result) {
                courseList = [];
                for (course of result) {
                    course.courseCode = global.getBase64(course.courseId);
                    courseList.push(course);
                }
                res.send(courseList);
            })
        }
        else{
            res.send(null);
        }
    });


    app.get('/api/userLessonTopicList/:courseId',  async (req, res) => {
        var user = await global.getUser(req)
        lesson.getLessonTopicList(user.userId, req.params.courseId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/reviewLevelList/:topicId/:review',  (req, res) => {
        lesson.getReviewLevelList(req.params.topicId,req.params.review).then(function (result) {
            res.send(result);
        })
    });




    app.get('/api/addAchievement/:topicId/:review',  async (req, res) => {
        user = await global.getUser(req)

        lesson.getAchievement(user.userId, req.params.topicId).then(result=>{
            if(result.length>0)
            {
                console.log("getAchievement",result[0].achievedTopicId);
                lesson.updateAchievement(result[0].achievedTopicId,req.params.review).then(function (result) {
                    res.send(result);
                })
            }
            else{
                lesson.addAchievement(user.userId, req.params.topicId,req.params.review).then(function (result) {
                    res.send(result);
                })
            }
        })


    });


    app.get('/api/topicTeachList/:topicId', (req, res) => {
        teach.getTopicTeachList(req.params.topicId).then(function (result) {
            res.send(result);
        });
    });


    app.get('/api/topicTeachListWithLevelId/:levelId', (req, res) => {
        teach.getTopicTeachWithLevelId(req.params.levelId).then(function (result) {
            res.send(result);
        });
    });

    app.get('/api/teach/:teachId', (req, res) => {
        teach.getTeach(req.params.teachId).then(function (result) {
            res.send(result);
        });
    });

    app.get('/api/teachPointList/:teachPointId', (req, res) => {
        teach.getTeachPointList(req.params.teachPointId).then(function (result) {
            res.send(result);
        });
    });

    app.get('/api/teachPoint/:teachPointId', (req, res) => {
        teach.getTeachPoint(req.params.teachPointId).then(function (result) {
            res.send(result);
        });
    });

    app.get('/api/teacherList',  (req, res) => {
        lesson.getTeacherList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/level/:levelId', (req, res) => {
        lesson.getLevelById(req.params.levelId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/levelLexicalPhraseList/:levelId', (req, res) => {
        word.getLevelLexicalPhraseList(req.params.levelId).then(function (result) {
            res.send(result);
        })
    });


}