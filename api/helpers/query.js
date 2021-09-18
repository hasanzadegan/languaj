const log = require('log-to-file');
const mysql = require('mysql');
const dbConfig = require('../helpers/config');
var pool = mysql.createPool(dbConfig.databaseOptions);
// console.log("connection pool created")

module.exports = async (stmt, params) => {
    let promise = new Promise(
        (resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(stmt, params, function (err, data) {
                    if (err) {
                        reject(stmt + "\n\n" + params + "\n\n" + err);
                        return;
                    } else {
                        resolve(data);
                    }
                    connection.release();
                });
            });
        })
    return await promise;
}


