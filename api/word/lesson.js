const global = require('../routes/_global');
const query = require('../helpers/query');

module.exports = {
    getCourseList: async function (userId, langId) {
        stmt = '' +
            ' select courseId,title,sourceLangId,destLangId ' +
            ' from course ' +
            ' where creatorUserId = ? '
            // +' and DestlangId = ? ';

        // params = [userId, langId];
        params = [userId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getUserCourseList: async function (userId) {
        stmt = 'select c.courseId,c.title,c.sourceLangId,c.destLangId,u.firstName,u.lastName,u.imageUrl\n' +
            'from \n' +
            '(\n' +
            '\tselect COURSEID,ISACTIVE,PAYMENTDATE from payedcourse where userId = ? \n' +
            '    union All \n' +
            '    select COURSEID,1 ISACTIVE,1900-1-1 from globalcourse) p,\n' +
            'course c,user u\n' +
            'where p.courseId = c.COURSEID\n' +
            'and u.userId = c.CreatorUserId\n' +
            'and p.isActive = 1\n' +
            'order by p.PAYMENTDATE desc';

        console.log(stmt,userId);
        params = [userId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getTeacherList: async function () {
        stmt = ' ' +
            ' select \n' +
            ' u.userId,u.email,u.firstName,u.lastName,u.imageUrl,\n' +
            '    CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\n' +
            ' \'title\', c.title,\n' +
            ' \'courseId\',c.courseId\n' +
            ')),\']\')courseList\n' +
            ' from User u,course c\n' +
            ' where \n' +
            ' c.creatorUserId = u.userId\n' +
            ' and u.isActive = true \n' +
            ' and u.userId in(\n' +
            ' select distinct creatorUserId \n' +
            ' from course)\n' +
            ' group by c.creatorUserId';
        // console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addCourse: async function (params) {
        stmt = '' +
            ' insert into course(creatorUserId,sourceLangId,destLangId,title)' +
            ' values(?,?,?,?)';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updateCourse: async function (params) {
        stmt = '' +
            ' update course set title = ?,sourceLangId = ?, destLangId=?  ' +
            ' where  courseId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updateLesson: async function (params) {
        stmt = '' +
            ' update lesson set title = ?' +
            ' where  lessonId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updateTopic: async function (params) {
        console.log(params);
        stmt = '' +
            ' update topic set title = ? ' +
            ' where  topicId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updateLevel: async function (params) {
        stmt =
            ' update level ' +
            ' set title = ?,orderr = ?' +
            ' where levelId = ?';
        console.log(stmt, params);
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    setLevelType: async function (params) {
        stmt =
            ' update level ' +
            ' set levelTypeId = ?, Title =?' +
            ' where levelId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteCourse: async function (courseCode) {
        var courseId = global.base64ToInt(courseCode);
        console.log("deleteCourse",courseCode,courseId)

        stmt = ' delete from course where courseId=' + courseId;
        console.log(stmt);
        return await query(stmt).then(function (result) {
            return result;
        }, function (error) {
            return error;
        })
    },
    getLessonList: async function (courseId) {
        stmt = '' +
            ' select lessonId,title ' +
            ' from lesson ' +
            ' where courseId = ? ';
        params = [courseId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getLessonTopicList: async function (userId,courseId,teacherId) {
        var teacherCondition = "";
        // if(teacherId)
        //     teacherCondition = ' and c.creatorUserId ='+teacherId;
        stmt = '' +
            'select l.lessonId,CONCAT(' +
            // '\'(\',c.title,\') - \',' +
            'l.title) title,\n' +
            'CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\n' +
            '\'title\', t.title,\n' +
            '\'achievedTopicId\',atp.topicId,\n' +
            '\'review\',atp.review,\n' +
            '\'topicId\',t.topicId\n' +
            ')),\']\')topicList \n' +
            ' from \n' +
            ' course c,lesson l ,' +
            ' topic t left join achievedTopic atp on t.topicId = atp.topicId  and atp.userId='+userId+
            ' where ' +
            ' c.courseId=l.courseId and ' +
            ' l.lessonId = t.lessonId' +
            ' and l.courseId='+courseId +
            teacherCondition +
            ' group by l.lessonId';
        console.log(stmt);
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addLesson: async function (params) {
        stmt = '' +
            ' insert into lesson(courseId,title)' +
            ' values(?,?)';
        console.log(stmt, params);
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteLesson: async function (lessonId) {
        stmt = ' delete from lesson where lessonId=' + lessonId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getTopicList: async function (lessonId) {
        stmt = '' +
            ' select topicId,title,isActive ' +
            ' from topic ' +
            ' where lessonId = ? ';
        params = [lessonId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    changeLevelTopic:async function(levelId,topicId){
        params = [topicId,levelId]
        stmt = '' +
            ' update level set topicId = ? ' +
            ' where  levelId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        });
    },
    addTopic: async function (params) {
        stmt = '' +
            ' insert into topic(lessonId,title,reviewNum)' +
            ' values(?,?,5)';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteTopic: async function (topicId) {
        stmt = 'delete from achievedTopic where topicId=' + topicId+';'
        return await query(stmt).then(function (result) {
            stmt = 'delete from topic where topicId=' + topicId+';'
            return query(stmt).then(function (result) {
                return result;
            });
        });
    },
    getLevelList: async function (topicId) {
        stmt = '' +
            ' select l.levelId,l.title,lt.icon,lt.levelTypeId,lt.title levelTypeTitle,l.teachId teachId,l.orderr,l.review   ' +
            ' from level l' +
            ' left join levelType lt on l.levelTypeId = lt.levelTypeId' +
            ' where topicId = ? order by IFNULL(orderr,99999999),levelId';
        params = [topicId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getReviewLevelList: async function (topicId,review) {
        stmt = '' +
            ' select l.levelId,l.title,lt.icon,lt.levelTypeId,lt.title levelTypeTitle,l.teachId teachId,l.orderr,l.review   ' +
            ' from level l' +
            ' left join levelType lt on l.levelTypeId = lt.levelTypeId' +
            ' where topicId = ? ' +
            ' and review=? ' +
            ' order by IFNULL(orderr,99999999),levelId';
        params = [topicId,review%5==0?5:review%5];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getLevelById: async function (levelId) {
        stmt = '' +
            ' select l.levelId,l.title,lt.icon,lt.levelTypeId,lt.title levelTypeTitle,l.teachId ' +
            ' from level l' +
            ' left join levelType lt on l.levelTypeId = lt.levelTypeId' +
            ' where levelId = ? ';


        params = [levelId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    addLevel: async function (params) {
        stmt = '' +
            ' insert into level(levelTypeId,topicId,teachId,title,isActive,review)' +
            ' values(?,?,?,?,?,?)';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteLevel: async function (levelId) {
        stmt = ' delete from level where levelId=' + levelId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addAchievement: async function (userId,topicId,review) {
        stmt = ' ' +
            ' insert into ' +
            ' achievedTopic(userId,topicId,review)' +
            ' values(?,?,?)';
        params = [userId,topicId,review];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    getAchievement: async function (userId,topicId) {
        stmt = ' ' +
            ' select achievedTopicId from achievedTopic' +
            ' where userId = '+userId+"" +
            ' and topicId = '+topicId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    updateAchievement: async function (achievedTopicId,review) {
        stmt = ' ' +
            ' update achievedTopic set review = '+review+' ' +
            ' where achievedTopicId = ' + achievedTopicId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addStudentCourse: async function (userId,courseId,refUserId) {
        stmt = ' ' +
            ' insert into ' +
            ' PayedCourse(userId,courseId,refUserId,paymentDate,isActive)' +
            ' values(?,?,?,?,1)';
        today = new Date();

        console.log("today",today);

        params = [userId,courseId,refUserId,today];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
}
