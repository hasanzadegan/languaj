const query = require('../helpers/query');

module.exports = {
    searchPhrase: async function (title) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord,p.isExtracted' +
            ' from phrase p where title like  \'%' + title + '%\' ' +
            ' order by length(title)' +
            ' limit 10';
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    searchSoundex: async function (word) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord,p.isExtracted' +
            ' from phrase p ' +
            ' where UPPER(SOUNDEX(deutscheReplace(title)))=UPPER(SOUNDEX (deutscheReplace(?))) ' +
            ' limit 10';
        return await query(stmt,word).then(function (result) {
            return result;
        })
    },
    getPhraseById: async function (phraseId) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord,p.isExtracted,p.creatorUserId' +
            ' from phrase p where phraseId=' + phraseId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    //todo
    getPhraseByLexicalPhraseId: async function (phraseId) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord,p.isExtracted' +
            ' from phrase p where phraseId=' + phraseId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getPhraseWordById: async function (phraseWordId) {
        stmt =
            ' select \n' +
            ' pw.phraseWordId,p.phraseId,w.phraseId wordId,p.langId,p.genderId,w.title,p.isMultiWord,p.isExtracted,\n' +
            ' pw.POSTypeId,pw.infinitiveId,pw.pronounId,Pw.tenseId,pt.TITLE POSTitle,' +
            ' g.title genderTitle,t.title tenseTitle,k.kasusId kasusId, k.title kasusTitle\n' +
            'from phrase w \n' +
            ' left Join gender g on w.GENDERID= g.genderId,\n' +
            'phraseWord pw\n' +
            ' left Join POSType pt on pw.POSTYPEID = pt.POSTYPEID' +
            ' left Join Kasus k on pw.kasusId = k.kasusId' +
            ' left Join tense t on pw.tenseId = t.tenseId,\n' +
            'phrase p\n' +
            'where \n' +
            ' pw.phraseId = p.PHRASEID\n' +
            'and pw.wordId = w.PHRASEID\n' +
            'and pw.phraseWordId = ' + phraseWordId + '\n\n\n';
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    searchWord: async function (title) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord' +
            ' from phrase p where title=? and p.isMultiWord = 0';
        return await query(stmt, title).then(function (result) {
            return result;
        })
    },
    searchPhraseWord: async function (title) {
        stmt = 'select p.phraseId,p.langId,p.genderId,p.title,p.isMultiWord,\n' +
            ' pw.POSTypeId,pw.InfinitiveId,pw.PronounId,pw.TenseId \n' +
            ' from phrase p  \n' +
            ' left join phraseWord pw on p.phraseId = pw.wordId\n' +
            'where title=? ' +
            // 'and p.isMultiWord = 0' +
            '';
            params = [title]
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updatePhraseWord: async function (params) {
        stmt =
            ' update phraseWord ' +
            ' set POSTypeId=?,infinitiveId=?,pronounId=?,tenseId=?,kasusId=?' +
            ' where phraseWordId = ?';
        // console.log("updatePhraseWord", params)
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updatePhrase: async function (params) {
        stmt =
            ' update phrase ' +
            ' set genderId=? ' +
            ' where phraseId = ?';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    updatePhraseTitle: async function (params) {
        stmt =
            ' update phrase ' +
            ' set title=? ' +
            ' where phraseId = ?';

        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    saveWord: async function (langId, title) {
        stmt = 'INSERT INTO ' +
            'phrase(`LANGID`, `TITLE`, `ISMULTIWORD`) ' +
            'VALUES (?,?,?);\n ';
        params = [langId, title, 0];
        // console.log(params)
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getLexicalOtherPhraseList: async function (phraseId) {
        stmt = ' select rt.relationTypeId,rt.title,l.lexicalId, ' +
            '  CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\'title\', p.title,' +
            '\'phraseId\',p.phraseId,' +
            '\'genderId\',p.genderId,' +
            '\'lexicalphraseId\',lp.lexicalphraseId' +
            ')),\']\') lexicalList \n' +
            ' from relationtype rt,lexical l,lexicalphrase lp ,phrase p ' +
            ' where ' +
            ' rt.RELATIONTYPEID = l.RELATIONTYPEID ' +
            ' and l.lexicalId in (select lexicalId from lexicalphrase where PHRASEID=' + phraseId + ')' +
            ' and l.LEXICALID = lp.LEXICALID ' +
            ' and lp.PHRASEID = p.PHRASEID ' +
            // ' and p.phraseId <> '+phraseId+
            ' group by title,l.lexicalId';

        // console.log("\n\n\n "+stmt);

        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getLexicalImageList : async function (lexicalId) {
        stmt = ' ' +
            ' select documentId ' +
            ' from lexicalImage ' +
            ' where lexicalId = '+lexicalId;
        // console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getLevelImageList : async function (levelId) {
        stmt = ' ' +
            ' select lv.levelId,d.docArchiveId,d.docData \n' +
            ' from  \n' +
            '  level lv,     \n' +
            '  LevelLexicalPhrase llp,lexicalPhrase lp,LexicalImage li,docarchive d  \n' +
            '  where lv.levelId = llp.levelId  and llp.lexicalphraseId = lp.lexicalphraseId  \n' +
            ' and lp.lexicalId = li.lexicalId  and li.documentId=d.DocArchiveId  and lv.levelId = '+levelId;
        // console.log("getLevelImageList \n\n\n"+stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getPhraseSoundList : async function (phraseId) {
        if(phraseId==undefined || phraseId==null)
            return [];
        stmt = ' ' +
            ' select documentId ' +
            ' from PhraseSound ' +
            ' where phraseId = '+phraseId;
        // console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addPhraseSound: async function (phraseId,soundId) {
        stmt = ' INSERT INTO PhraseSound(phraseId,documentId) ' +
            'VALUES (?,?)';
        params = [phraseId,soundId];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    addLexicalImage: async function (lexicalId,imageId) {
        stmt = ' INSERT INTO LexicalImage(lexicalId,documentId) ' +
            'VALUES (?,?)';
        params = [lexicalId,imageId];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    deleteLexicalImage : async function (lexicalId,imageId) {
        stmt = ' ' +
            ' delete from lexicalImage' +
            ' where lexicalId =? ' +
            ' and documentId = ? ' ;
        params = [lexicalId,imageId];
        // console.log(stmt,params)
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    deletePhraseSound : async function (phraseId,soundId) {
        stmt = ' ' +
            ' delete from PhraseSound' +
            ' where phraseId =? ' +
            ' and documentId = ? ' ;
        params = [phraseId,soundId];
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    addLexical: async function (relationTypeId) {
        stmt = ' insert into Lexical(relationTypeId) values(?)';
        params = [relationTypeId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteLexicalPhrase: async function (lexicalPhraseId) {
        stmt = ' delete from lexicalPhrase where lexicalPhraseId=' + lexicalPhraseId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    assignLexicalPhrase: async function (lexicalId, phraseId) {
        stmt = ' insert into LexicalPhrase(lexicalId,phraseId) values(?,?)';
        params = [lexicalId, phraseId];
        // console.log(">>>>>>>>>>>>>>>>", params)
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getLevelLexicalPhraseList: async function (levelId) {
        // stmt = ' ' +
        //     ' SELECT \n' +
        //     ' p.phraseId,lp.lexicalId,llp.levelLexicalPhraseId,llp.levelId,llp.lexicalPhraseId,' +
        //     ' llp.itemJSON,p.title\n' +
        //     ' FROM levelLexicalPhrase llp,lexicalPhrase lp,phrase p' +
        //     ' where llp.lexicalPhraseId = lp.lexicalPhraseId' +
        //     ' and lp.phraseId = p.phraseId' +
        //     ' and llp.levelId = ' + levelId;

        stmt = '' +
            'SELECT lp.lexicalId,llp.levelLexicalPhraseId,llp.levelId,llp.lexicalPhraseId,llp.itemJSON,p.phraseId,p.title \n' +
            '             FROM levelLexicalPhrase llp\n' +
            '             left join lexicalPhrase lp on lp.lexicalphraseId = llp.lexicalphraseId\n' +
            '             left join phrase p on lp.phraseId = p.phraseId \n' +
            '             left join level l on l.LEVELID = llp.LEVELID \n' +
            '             where llp.levelId = ' + levelId;

        return await query(stmt).then(function (result) {
            return result;
        })
    },
    updateLevelItemJson: async function (params) {
        stmt = '' +
            ' update LevelLexicalPhrase set ' +
            ' ItemJSON = ? ' +
            ' where LevelLexicalPhraseId = ?';
        return await query(stmt,params).then(function (result) {
            return result;
        })
    },
    assignLevelLexicalPhrase: async function (params) {
        // console.log(params)
        stmt = ' ' +
            ' insert into levelLexicalPhrase (levelId,lexicalPhraseId,itemJSON)' +
            'values (?,?,?)';
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    getOriginLexicalPhrase: async function (lexicalId, phraseId) {
        stmt = 'select lp.lexicalPhraseId,l.lexicalId,lp.phraseId from lexical l,lexicalPhrase lp ' +
        'where ' +
        'l.LEXICALID = lp.LEXICALID ' +
        'and l.lexicalId = ? ' +
        'and lp.phraseId = ? ';
        params = [lexicalId, phraseId];
        return await query(stmt, params).then(function (result) {
            return result;
        })
    },
    deleteLevelLexicalPhrase: async function (levelLexicalPhraseId) {
        stmt = ' ' +
            ' delete from levelLexicalPhrase where levelLexicalPhraseId = ' + levelLexicalPhraseId;
        console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    deleteLevelLexicalPhraseByLevel: async function (levelId) {
        stmt = ' ' +
            ' delete from levelLexicalPhrase where levelId = ' + levelId;
        console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    // addLevelLexicalPhrase: async function (params) {
    //     stmt = ' ' +
    //         ' SELECT \n' +
    //         ' levelLexicalPhraseId,levelId,lexicalPhraseId,\n' +
    //         ' ValidityTypeId,ItemJSON,itemFlex\n' +
    //         ' FROM languaj_db.levellexicalphrase;';
    //     return await query(stmt).then(function (result) {
    //         return result;
    //     })
    // },
    getLevelLexicalPhraseById: async function (levelLexicalPhraseId) {
        stmt = '' +
            ' select ' +
            ' llp.levelLexicalPhraseId,llp.levelId,llp.lexicalPhraseId,llp.itemJSON ' +
            ' from levellexicalphrase llp' +
            ' where levelLexicalPhraseId = '+levelLexicalPhraseId;

        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getLevelType: async function (levelId) {
        stmt = 'SELECT l.levelId,lt.levelTypeId,lt.title,lt.icon \n' +
            'from level l \n' +
            'left join levelType lt on l.levelTypeId = lt.levelTypeId \n' +
            'where l.levelId =' + levelId;
        // console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getInfinitive: async function (infinitiveId) {
        stmt = 'select infinitiveId,title from infinitive where INFINITIVEID = ' + infinitiveId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getTense: async function (tenseId) {
        stmt = 'select tenseId,title from tense where tenseId = ' + tenseId;
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getConjugationList: async function (infinitiveId, tenseId, kasusId) {
        kasusId = 1;
        stmt = '' +
            '  select p.pronoungroupId,c.title,\n' +
            ' CONCAT(\'[\',GROUP_CONCAT(JSON_OBJECT(\'pronounId\', p.pronounId,\'title\',p.title)),\']\') conjugationList\n' +
            ' from \n' +
            '  pronoun p,\n' +
            '  pronounGroup pg\n' +
            '   left join conjugation c on c.pronounGroupId = pg.pronounGroupId ' +
            ' and c.tenseId=' + tenseId + ' and c.infinitiveId=' + infinitiveId + '\n' +
            ' where pg.pronounGroupId = p.pronounGroupId\n' +
            ' and p.kasusId = ' + kasusId + '\n' +
            ' group by p.pronoungroupId,c.title\n';
        // console.log(stmt)
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    getPhraseWordList: async function (phraseId) {
        stmt =
            ' select  pw.phraseWordId,pw.phraseId,pw.WordId\n' +
            ',pw.POSTypeId,pw.infinitiveId,pw.tenseId,pw.kasusId,p.genderId,p.title \n' +
            'from phraseWord pw,phrase p  \n' +
            'where \n' +
            '\tpw.wordId = p.phraseId\n' +
            'and pw.phraseId = ' + phraseId;

        return await query(stmt).then(function (result) {
            return result;
        }, function (error) {
            return error;
        })
    },
    searchInfinitive: async function (Infinitive) {
        stmt = 'select i.infinitiveId,i.title from infinitive i  where title like  \'%' + Infinitive + '%\'';
        return await query(stmt).then(function (result) {
            return result;
        })
    },
    addPhrase: async function (title, languageId,userId) {
        stmt = 'INSERT INTO phrase(langId, title, isMultiWord,creatorUserId) ' +
            ' VALUES (?,?,?,?)';
        // isMultiple = title.split(" ").length>1;
        isMultiple = 1;
        params = [languageId, title, isMultiple,userId];
        // console.log(params)
        return await query(stmt, params).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    deletePhrase: async function (phraseId) {
        stmt = 'delete from phrase where phraseId = ' + phraseId;
        return await query(stmt).then(function (result) {
            return result;
        }, function (error) {
            return error
        })
    },
    savePhraseWord: async function (phraseWordList) {
        stmt = 'INSERT INTO phraseWord(phraseId, wordId,POSTypeId,InfinitiveId,PronounId,TenseId) ' +
            ' VALUES ?';
        return await query(stmt, [phraseWordList]).then(function (result, err) {
            return result;
        })
    },
    deletePhraseLexical: async function (phraseId) {
        stmt = 'delete from lexicalPhrase where phraseId=' + phraseId;
        // console.log(">>>>>>>>>>>>>>>>", stmt);
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    deletePhraseWord: async function (phraseId) {
        stmt = 'delete from phraseWord where phraseId=' + phraseId;
        // console.log(">>>>>>>>>>>>>>>>", stmt);
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },
    setPhraseExtractd: async function (phrase) {
        let stmt = "UPDATE phrase SET isExtracted=1 where phraseId = " + phrase.phraseId;
        return await query(stmt).then(function (result, err) {
            return result;
        })
    },

}
