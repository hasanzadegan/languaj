const keys = require("../config/key");
const jwt = require('jsonwebtoken');

var userId;
var buff;
let courseParam1 = 7;
let courseParam2 = 23;
const log = require('log-to-file');


module.exports = {
    getUser: async function (req) {
        return new Promise(resolve => {
            var token = req.headers.authorization.replace("Bearer ", "");
            jwt.verify(token, keys.jwt.key, function (err, decoded) {
                if (decoded) {
                    resolve(req.session.user?req.session.user:decoded.user);
                } else
                    resolve(null);
            });
        });

        //todo impersonate
        // console.log("getUser",req.user)
        // if(req.user)
        //     return userId = req.session.user === undefined ? req.user.userId : req.session.user.userId;
        // else
        //     return null;
    },
    getBase64: function (id) {
        let formola = "" + ((id + courseParam1) * courseParam2)
        let buff = new Buffer.from(formola);
        let base64data = buff.toString('base64');
        return base64data;
    },
    base64ToInt: function (base64) {
        buff = Buffer.from(base64, 'base64');
        const str = buff.toString('utf-8');
        var id = -1;
        if (!isNaN(str)) {
            id = Number(str) / courseParam2 - courseParam1;
        }
        return id;
    },
    logger: function (str, data, req) {
        userId = this.getUser(req).userId;
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        log(userId + " " + str+" "+data, "./log/" + yyyy + "-" + mm + "-" + dd + ".log");
    },
    accessProtectionMiddleware: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403).json({
                message: 'must be logged in to continue',
            });
        }
    }
};


