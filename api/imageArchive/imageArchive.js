const query = require('../helpers/query');
module.exports = {
    getImage: async function (docId) {
        stmt = 'select docData from docArchive where docArchiveId ='+docId;
        // console.log(stmt)
        return await query(stmt, '').then(function (result) {
            if(result.length>0)
                return result[0];
        })
    },
}
