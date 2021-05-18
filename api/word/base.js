const query = require('../helpers/query');

module.exports = {
    getLangList: async function () {
        stmt = 'select langId,title,code,isSource,isDestination from Lang';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getPOSTypeList: async function () {
        stmt = 'select POSTypeId,title from POSType';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getGenderList: async function () {
        stmt = 'select genderId,title from gender ';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getTenseList: async function (langId) {
        stmt = 'select t.tenseId,t.title from tense t where langId=' + langId;
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getKasusList: async function () {
        stmt = 'select kasusId,title from kasus';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getLevelTypeList: async function () {
        stmt = 'select l.levelTypeId,l.title,l.icon,GROUP_CONCAT(ld.Title) levelTypeList \n' +
            ' from levelType l\n' +
            ' left join leveltypedefault ld \n' +
            ' \ton l.levelTypeId = ld.levelTypeId \n' +
            ' group by l.LEVELTYPEID\n';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getValidityTypeList: async function () {
        stmt = 'select validityTypeId,title,icon from validityType';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getArticleList: async function (langId) {
        stmt = 'select k.kasusId,k.title,' +
            ' CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\'title\', a.title, \'genderId\',a.genderId)),\']\') articleList' +
            ' from kasus k,article a ' +
            ' where k.KASUSID = a.KASUSID ' +
            ' and k.langId = ' + langId +
            ' group by k.kasusId';
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
    getPronounList: async function (langId) {
        stmt = ' select k.kasusId,k.title,' +
            ' CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\'title\', p.title, \'pronounId\',p.pronounId)),\']\') pronounList' +
            ' from pronoun p, kasus k' +
            ' where k.KasusId = p.KasusId ' +
            ' and k.langId = ' + langId + '' +
            ' group by k.TITLE ' +
            ' order by KASUSID ';
        // console.log(stmt)
        return await query(stmt, '').then(function (result) {
            return result;
        })
    },
}
