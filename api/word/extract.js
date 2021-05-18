const word = require('../word/word');




module.exports = {
    extractPhrase: async function (phrase) {
        return new Promise((resolve ,reject)=>{
            var resultPhraseList = [];
            var saveOrUpdate = async function (phraseId,wordList, cnt) {
                if (cnt < wordList.length ){
                    word.searchPhraseWord(wordList[cnt]).then(wordResult => {
                        if (wordResult.length > 0) {
                            findWord = [
                                phraseId,
                                wordResult[0].phraseId,
                                wordResult[0].POSTypeId,
                                wordResult[0].InfinitiveId,
                                wordResult[0].PronounId,
                                wordResult[0].TenseId
                            ];
                            resultPhraseList.push(findWord);
                            saveOrUpdate(phraseId,wordList, cnt + 1);
                        } else {
                            word.saveWord(phrase.langId, wordList[cnt]).then(newWordResult => {
                                newWord = [
                                    phraseId,
                                    newWordResult.insertId,
                                    '',
                                    '',
                                    '',
                                    ''
                                ];
                                resultPhraseList.push(newWord);
                                saveOrUpdate(phraseId,wordList, cnt + 1);
                            });
                        }
                    });
                }else{
                    word.savePhraseWord(resultPhraseList).then(saveResult=>{
                        resolve(saveResult);
                    })
                }
            };
            word.deletePhraseWord(phrase.phraseId).then(function (resultDeletePhraseWord) {
                cnt = 0;
                wordList = phrase.title.split(' ');
                resolve(saveOrUpdate(phrase.phraseId,wordList, cnt));
            });
        })
    },
}



