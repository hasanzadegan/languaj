const word = require('../word/word');
const teach = require('../teach/teach');
const lesson = require('../word/lesson');


module.exports = function(app){
    app.post('/api/assignLexical/', (req, res) => {
        //todo group of words
        // global.logger(req.body);

        relationTypeId = req.body.relationTypeId;
        phrase1 = req.body.phraseId1;
        phrase2 = req.body.phraseId2;
        promise = new Promise((resolve, reject) => {
            word.addLexical(relationTypeId).then(function (result) {
                resolve(result);
            })
        }).then(result => {
            new Promise((resolve, reject) => {
                word.assignLexicalPhrase(result.insertId, phrase1).then(resultPhrase1 => {
                    word.assignLexicalPhrase(result.insertId, phrase2).then(resultPhrase1 => {
                        res.send("ok")
                    });
                })
            })
        })
    });

    app.delete('/api/deleteLexicalPhrase/:lexicalPhraseId', (req, res) => {
        lexicalPhraseId = req.params.lexicalPhraseId;
        word.deleteLexicalPhrase(lexicalPhraseId).then(result => {
            res.send("ok");
        })
    });

    app.post('/api/updateLevelLexicalJson', (req, res) => {
        word.updateLevelLexicalJson(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/assignLevelLexicalPhrase', (req, res) => {
        word.assignLevelLexicalPhrase(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.delete('/api/deleteLevelLexicalPhrase/:levelLexicalPhraseId', (req, res) => {
        word.deleteLevelLexicalPhrase(req.params.levelLexicalPhraseId).then(function (result) {
            res.send(result);
        })
    });


    app.post('/api/addTopicTeach/:topicId/:teachId',(req, res) => {
        teach.addTopicTeach(req.params.topicId,req.params.teachId).then(function (result) {
            res.send(result);
        });
    });

    app.delete('/api/deleteTopicTeach/:topicTeachId',(req, res) => {
        teach.deleteTopicTeach(req.params.topicTeachId).then(function (result) {
            res.send(result);
        });
    });

    app.post('/api/addTeach', (req, res) => {
        teach.addTeach(req.body.title).then(function (result) {
            res.send(result);
        });
    });
    app.delete('/api/deleteTeach/:teachId', (req, res) => {
        teach.deleteTeach(req.params.teachId).then(function (result) {
            res.send("ok");
        });
    });
    app.post('/api/updateTeach', (req, res) => {
        teach.updateTeach(req.body).then(function (result) {
            res.send(result);
        });
    });


    app.get('/api/updateLevelTeach/:levelId/:teachId', (req, res) => {
        teach.updateLevelTeach(req.params.levelId,req.params.teachId).then(function (result) {
            res.send(result);
        });
    });
    app.post('/api/searchTeach', (req, res) => {
        teach.searchTeach(req.body.title).then(function (result) {
            res.send(result);
        });
    });

    app.post('/api/addTeachPoint', (req, res) => {
        teach.addTeachPoint(req.body.teachId,req.body.startTime).then(function (result) {
            res.send(result);
        });
    });

    app.post('/api/updateTeachPoint', (req, res) => {
        teach.updateTeachPoint(req.body).then(function (result) {
            res.send(result);
        });
    });
    app.delete('/api/deleteTeachPoint/:teachPointId', (req, res) => {
        teach.deleteTeachPoint(req.params.teachPointId).then(function (result) {
            res.send(result);
        });
    });



}
