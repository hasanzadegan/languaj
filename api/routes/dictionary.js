const global = require('../routes/_global');
const word = require('../word/word');

module.exports = function(app){

    app.post('/api/searchPhrase', (req, res) => {
        word.searchPhrase(req.body.title).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/searchSoundex', (req, res) => {
        word.searchSoundex(req.body.title).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/phrase/:phraseId', (req, res) => {
        word.getPhraseById(req.params.phraseId).then(function (result) {
            res.send(result);
        })
    });


    app.get('/api/phraseWord/:phraseWordId', (req, res) => {
        word.getPhraseWordById(req.params.phraseWordId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/phraseWordList/:id', (req, res) => {
        word.getPhraseWordList(req.params.id).then(function (result) {
            res.send(result);
        })
    });


    app.get('/api/lexicalOtherPhraseList/:phraseId', (req, res) => {
        word.getLexicalOtherPhraseList(req.params.phraseId).then(function (result) {
            res.send(result);
        })
    });


    app.get('/api/lexicalImageList/:lexicalId', (req, res) => {
        word.getLexicalImageList(req.params.lexicalId).then(function (result) {
            imageList = [];
            for (image of result) {
                imageList.push(image.documentId)
            }
            res.send(imageList);
        })
    });

    app.get('/api/levelImageList/:levelId', (req, res) => {
        word.getLevelImageList(req.params.levelId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/phraseSoundList/:phraseId', (req, res) => {
        word.getPhraseSoundList(req.params.phraseId).then(function (result) {
            soundList = [];
            for (sound of result) {
                soundList.push(sound.documentId)
            }
            res.send(soundList);
        })
    });

    app.get('/api/infinitive/:infinitiveId', (req, res) => {
        word.getInfinitive(req.params.infinitiveId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/tense/:tenseId', (req, res) => {
        word.getTense(req.params.tenseId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/conjugationList/:tenseId/:infinitiveId', (req, res) => {
        word.getConjugationList(req.params.infinitiveId, req.params.tenseId).then(function (result) {
            res.send(result);
        })
    });


    app.get('/api/levelLexicalPhrase/:levelLexicalPhraseId', (req, res) => {
        word.getLevelLexicalPhraseById(req.params.levelLexicalPhraseId).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/searchInfinitive', (req, res) => {
        word.searchInfinitive(req.body.title).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/originLexicalPhrase/:lexicalId/:phraseId', (req, res) => {
        word.getOriginLexicalPhrase(req.params.lexicalId, req.params.phraseId).then(function (result) {
            res.send(result);
        })
    });


}