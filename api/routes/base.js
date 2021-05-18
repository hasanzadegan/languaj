const global = require('../routes/_global');
const base = require('../word/base');
module.exports = function(app){

    app.get('/api/langList', (req, res) => {
        base.getLangList().then(function (result) {
            res.send(result);
        })
    });


    app.get('/api/POSTypeList', (req, res) => {
        base.getPOSTypeList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/genderList', (req, res) => {
        base.getGenderList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/kasusList/:langId', (req, res) => {
        base.getKasusList(req.params.langId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/levelTypeList', function (req, res, next) {
        base.getLevelTypeList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/validityTypeList', (req, res) => {
        base.getValidityTypeList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/levelType/:levelId', (req, res) => {
        word.getLevelType(req.params.levelId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/tenseList', (req, res) => {
        base.getTenseList().then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/articleList/:langId', (req, res) => {
        base.getArticleList(req.params.langId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/pronounList/:langId', (req, res) => {
        base.getPronounList(req.params.langId).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/tenseList/:langId', (req, res) => {
        base.getTenseList(req.params.langId).then(function (result) {
            res.send(result);
        })
    });

}