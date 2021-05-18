const query = require('../helpers/query');

module.exports = {
    getTopicTeachList:async function(topicId){
        stmt = '' +
            ' select \n' +
            ' CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(' +
                '\'topicTeachId\',tp.topicTeachId, ' +
                '\'teachId\',t.teachId, ' +
                '\'title\', t.title, ' +
                '\'imageId\', t.imageId, ' +
                '\'voiceId\', t.voiceId, ' +
                '\'teachCode\',t.teachCode,' +
                '\'duration\',t.duration' +
            ' )),\']\') teachList \n' +
            ' from topicTeach tp,teach t\n' +
            ' where tp.teachId = t.teachId' +
            ' and topicId=' + topicId;

        return await query(stmt).then(function (result) {
            return result[0].teachList;
        });
    },
    addTopicTeach:async function(topicId,teachId){
        stmt = ' insert into topicTeach(topicId,teachId) ' +
            ' values (?,?)';
        params = [topicId,teachId];
        return await query(stmt,params).then(function (result) {
            return result;
        });
    },
    deleteTopicTeach:async function(topicTeachId){
        stmt = ' delete from topicTeach ' +
            ' where topicTeachId = '+topicTeachId;
        return await query(stmt).then(function (result) {
            return result;
        });
    },

    getTeach: async function (teachId) {
        stmt = 'select teachId,teachCode,title,imageId,voiceId,description,duration from teach ' +
            ' where status is null and teachId = ' + teachId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addTeach: async function (title) {
        stmt = 'INSERT INTO teach(teachCode,title) ' +
            ' VALUES (?,?)';
        params = [0, title];
        return await query(stmt, params).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    deleteTeach: async function (teachId) {
        stmt = 'update teach set status = 2 where teachId = ' + teachId;
        return await query(stmt).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    updateTeach: async function (teach) {
        stmt = 'update teach ' +
            ' set teachCode=?,title=?,imageId=?,voiceId=?,duration=?,description=? ' +
            ' where teachId = ?';
        console.log(teach)
        params = [teach.teachCode,teach.title,teach.imageId,teach.voiceId,teach.duration,teach.description,teach.teachId];
        return await query(stmt,params).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    updateLevelTeach: async function (levelId,teachId) {
        stmt = 'update level ' +
            ' set teachId=? ' +
            ' where levelId = ?';
        params = [teachId,levelId];
        return await query(stmt,params).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    searchTeach: async function (title) {
        stmt = 'select teachId,teachCode,title,imageId,voiceId,duration ' +
            ' from teach t where  title like \'%'+title+'%\'';
        return await query(stmt).then(function (result) {
            return result;
        })
    },

    getTeachPointList: async function (teachId) {
        stmt = 'select teachId,teachPointId,HTML,startTime,imageId,voiceId' +
            ' from teachPoint where teachId = ' + teachId ;
            +' order by startTime desc';
        return await query(stmt).then(function (result) {
            return result;
        })
    },

    addTeachPoint: async function (teachId,startTime) {
        stmt = 'insert into ' +
            ' teachPoint(teachId,startTime,HTML) ' +
            'values(?,?,?)';
        params = [teachId,startTime,''];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    getTeachPoint: async function (teachPointId) {
        stmt = 'select teachId,teachPointId,HTML,startTime,imageId,voiceId' +
            ' from teachPoint where teachPointId = ' + teachPointId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    updateTeachPoint: async function (param) {
        stmt = 'update teachPoint set HTML=?,startTime=?,imageId=?,voiceId=?' +
            '  where teachPointId = ?';
        params = [param.HTML,param.startTime,param.imageId,param.voiceId,param.teachPointId];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    deleteTeachPoint: async function (teachPointId) {
        stmt = ' delete ' +
            ' from teachPoint where teachPointId = ' + teachPointId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },

    getTopicTeachWithLevelId: async function (levelId) {
        stmt = 'SELECT tp.topicId,\n' +
            '     CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT( \n' +
            '                \'topicTeachId\',tp.topicTeachId,  \n' +
            '                \'teachId\',t.teachId,  \n' +
            '                \'title\', t.title,  \n' +
            '                \'imageId\', t.imageId,  \n' +
            '                \'voiceId\', t.voiceId,  \n' +
            '                \'teachCode\',t.teachCode, \n' +
            '                \'duration\',t.duration \n' +
            '             )),\']\') teachList \n' +
            'FROM \n' +
            'topicTeach tp,teach t\n' +
            'where \n' +
            'tp.topicId in\n' +
            '\t(select \n' +
            '\t\tdistinct topicId \n' +
            '\tfrom \n' +
            '\t\tLevel where levelId = ?)';
        params = [levelId];
        return await query(stmt,params).then(function (result) {
            return result[0].teachList;
        })
    },
}
