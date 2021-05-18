const query = require('../helpers/query');

module.exports = {
    saveDoc: async function (doc) {
        let stmt = "" +
            " INSERT INTO " +
            " docArchive (docData) " +
            " VALUES (?)";
        return await query(stmt,doc.docData).then(function (result, err) {
            return result;
        })
    },
    getDoc: async function (docArchiveId) {
        if(!docArchiveId)
            return null;
        let stmt = " " +
            " select docData " +
            " from docArchive " +
            " where docArchiveId = " + docArchiveId;
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    getLexicalImageList:async function(levelId){
        let stmt = " \n\n\n" +
            " select lv.levelId,d.docArchiveId,d.docData" +
            " from " +
            " level lv, " +
            "    LevelLexicalPhrase llp, " +
            "    lexicalPhrase lp, " +
            "    LexicalImage li, " +
            "    docarchive d " +
            " where lv.levelId = llp.levelId " +
            " and llp.lexicalphraseId = lp.lexicalphraseId " +
            " and lp.lexicalId = li.lexicalId " +
            " and li.documentId=d.DocArchiveId " +
            " and lv.levelId = " + levelId +"\n\n\n";
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    deleteDoc: async function (docArchiveId) {
        let stmt = "delete from docArchive " +
            " where DocArchiveId = " + docArchiveId;
        //console.log(stmt);
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    getImageList:async function(imageIdList){
        if(imageIdList.length===0)
            return [];
        let stmt = " " +
            " select docArchiveId,docData " +
            " from docArchive " +
            " where docArchiveId in("+imageIdList.join()+")" ;
        return await query(stmt,imageIdList).then(function (result, err) {
            return result;
        })
    },
}
