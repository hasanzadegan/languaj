const global = require('../routes/_global');
const word = require('../word/word');
const verb = require('../word/verb');
const extract = require('../word/extract');


module.exports = function(app) {

    app.post('/api/addPhrase',  async (req, res) => {
        var phrase = req.body.title;
        var langId = req.body.langId;
        var user = await global.getUser(req)
        word.addPhrase(phrase, langId, user.userId).then(function (phraseResult) {
            res.send(phraseResult);
        });

    });

    app.delete('/api/deletePhrase/:phraseId',  async (req, res) => {
        var phraseId = req.params.phraseId;
        var user = await global.getUser(req)

        word.getPhraseById(phraseId).then(result => {
            if (result.length > 0)
                if (result[0].creatorUserId === user.userId) {
                    word.deletePhraseLexical(phraseId).then(resultPL => {
                        word.deletePhraseWord(phraseId).then(resultPW => {
                            word.deletePhrase(phraseId).then(function (result) {
                                res.send(result);
                            });
                        })
                    })
                } else {
                    return null;
                }
        })
    });

    app.post('/api/extractPhrase', async (req, res) => {
        extract.extractPhrase(req.body).then(result => {
            res.send(result);
        })
    });

    app.post('/api/updatePhraseWord', (req, res) => {
        params = [req.body.POSTypeId, req.body.infinitiveId, req.body.pronounId, req.body.tenseId, req.body.kasusId, req.body.phraseWordId];
        word.updatePhraseWord(params).then(result => {
            res.send(result);
        });
    });

    app.post('/api/updatePhrase', (req, res) => {
        params = [req.body.genderId, req.body.wordId];
        word.updatePhrase(params).then(result => {
            res.send(result);
        });
    });

    app.post('/api/updatePhraseTitle', (req, res) => {
        params = [req.body.title, req.body.phraseId];
        word.updatePhraseTitle(params).then(result => {
            res.send(result);
        });
    });

    app.get('/api/addLexicalImage/:lexicalId/:imageId', (req, res) => {
        word.addLexicalImage(req.params.lexicalId, req.params.imageId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/addPhraseSound/:phraseId/:soundId', (req, res) => {
        word.addPhraseSound(req.params.phraseId, req.params.soundId).then(function (result) {
            res.send(result);
        })
    });

    app.delete('/api/deleteLexicalImage/:lexicalId/:imageId', (req, res) => {
        word.deleteLexicalImage(req.params.lexicalId, req.params.imageId).then(function (result) {
            res.send(result);
        })
    });

    app.delete('/api/deletePhraseSound/:phraseId/:soundId', (req, res) => {
        word.deletePhraseSound(req.params.phraseId, req.params.soundId).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/updateConjugation', (req, res) => {
        verb.getConjugation(req.body).then(result => {

            if (result.length > 0)
                verb.updateConjugation(req.body).then(updateResult => {
                    res.send(updateResult);
                })
            else
                verb.insertConjugation(req.body).then(insertResult => {
                    res.send(insertResult);
                })
        })
    });

}