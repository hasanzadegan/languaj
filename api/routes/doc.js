const imageArchive = require('../imageArchive/imageArchive');
const docArchive = require('../docArchive/docArchive');

module.exports = function(app){
    app.get("/api/media/:id", function (req, res) {
        imageArchive.getImage(req.params.id).then(result => {
            if (result.docData) {
                var img = Buffer.from(result.docData.split(',')[1], 'base64');
                res.writeHead(200, {
                    'Content-Type': result.docData.split(',')[0].split('data:')[1].split(';')[0],
                    'Cache-Control':'public',
                    'Accept-Ranges': 'bytes',
                    'max-age':'31536000',
                    'Content-Length': img.length
                });
                res.end(img);
            } else {
            }
        }).catch(err => {
            res.send('');
        });
    });
    //
    // app.get("/doc/:id", function (req, res) {
    //     imageArchive.getImage(req.params.id).then(result => {
    //         if (result.docData) {
    //             var img = Buffer.from(result.docData.split(',')[1], 'base64');
    //             res.writeHead(200, {
    //                 'Content-Type': result.docData.split(',')[0].split('data:')[1].split(';')[0],
    //                 'Cache-Control':'public',
    //                 'Accept-Ranges': 'bytes',
    //                 'max-age':'31536000',
    //                 'Content-Length': img.length
    //             });
    //             res.end(img);
    //         } else {
    //         }
    //     }).catch(err => {
    //         res.send('');
    //     })
    // });

    app.post('/api/saveDoc', (req, res) => {
        docArchive.saveDoc(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.post('/api/imageList', (req, res) => {
        docArchive.getImageList(req.body).then(function (result) {
            res.send(result);
        })
    });

    app.get('/api/doc/:docArchiveId', (req, res) => {
        docArchive.getDoc(req.params.docArchiveId).then(function (result) {
            if (result.length === 0)
                res.send("");
            else
                res.send(result[0].docData);
        })
    });

    app.delete('/api/deleteDoc/:docArchiveId', (req, res) => {
        docArchive.deleteDoc(req.params.docArchiveId).then(function (result) {
            res.send(result);
        })
    });



}