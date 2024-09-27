const query = require('../helpers/query');

module.exports = {
    saveDoc: async function (doc) {
        let stmt = "" +
            " INSERT INTO " +
            " docArchive (docData) " +
            " VALUES (?)";
        return await query(stmt, doc.docData).then(function (result, err) {
            return result;
        })
    },
    getDoc: async function (docArchiveId) {
        if (!docArchiveId)
            return null;
        let stmt = " " +
            " select docData " +
            " from docArchive " +
            " where docArchiveId = " + docArchiveId;
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },

    getUnreviewDoc: async function () {
            stmt = "select \n" +
                "\tl.lexicalId,li.lexicalImageId,li.documentId,dc.review,\n" +
                "    CONCAT('[',\n" +
                "    GROUP_CONCAT(JSON_OBJECT(\n" +
                "\t\t'LEXICALPHRASEID',lp.LEXICALPHRASEID,\n" +
                "        'title',p.TITLE))\n" +
                "    ,']') lexicalList\n" +
                "from \n" +
                "\tlexical l,\n" +
                "\tlexicalphrase lp,\n" +
                "\tphrase p,\n" +
                "\tlexicalimage li,\n" +
                "\tdocarchive dc\n" +
                "where \n" +
                "\tl.LEXICALID = lp.LEXICALID\n" +
                "and lp.PHRASEID = p.PHRASEID\n" +
                "and l.LEXICALID = li.LEXICALID\n" +
                "and l.LEXICALID is not null\n" +
                "and dc.DOCARCHIVEID = li.DOCUMENTID\n" +
                "group by l.LEXICALID,li.LEXICALIMAGEID,li.DOCUMENTID,dc.review\n" +
                "order by IFNULL(dc.review,-1) ";

        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    updateDocData: async function (docData) {
        let stmt = "update DOCARCHIVE " +
            " set docData = ?" +
            " where docArchiveId= ?";
        params = [docData.docData, docData.docArchiveId]
        console.log("****",params);

        return await query(stmt, params).then(function (result, err) {
            return result;
        })
    },
    updateDocReview: async function (docData) {
        let stmt = "update DOCARCHIVE " +
            " set review = ?" +
            " where docArchiveId=? ";
        params = [docData.review, docData.documentId];
        console.log("params >>>>>>>>.",params);

        return await query(stmt, params).then(function (result, err) {
            return result;
        })
    },
    getLexicalImageList: async function (levelId) {
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
            " and lv.levelId = " + levelId + "\n\n\n";
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
    getImageList: async function (imageIdList) {
        if (imageIdList.length === 0)
            return [];
        let stmt = " " +
            " select docArchiveId,docData " +
            " from docArchive " +
            " where docArchiveId in(" + imageIdList.join() + ")";
        return await query(stmt, imageIdList).then(function (result, err) {
            return result;
        })
    },
}
