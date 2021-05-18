const query = require('../helpers/query');

module.exports ={
    getConjugation: async function(body){
        params = [body.infinitiveId,body.tenseId,body.pronoungroupId,body.title]
        stmt = 'select * from ' +
            ' conjugation ' +
            ' where infinitiveId = ? ' +
            ' and tenseId = ? ' +
            ' and pronoungroupId = ? ';

        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    updateConjugation: async function(body){
        params = [body.title,body.infinitiveId,body.tenseId,body.pronoungroupId];
        // console.log(params);
        stmt = 'update  conjugation set title = ? ' +
            ' where infinitiveId = ? and tenseId = ? and pronounGroupId = ?' ;
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    insertConjugation: async function(body){
        params = [body.infinitiveId,body.tenseId,body.pronoungroupId,body.title]
        stmt = 'insert into conjugation(infinitiveId,tenseId,pronoungroupId,title)' +
            'values (?,?,?,?)';
        return await query(stmt,params).then(function (result) {
            return result;
        })
    }
}
