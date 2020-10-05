const mssql = require('mssql');
const config = {
    user: 'sa',
    password: 'toledo',
    server: 'localhost',
    database: 'WIG'
};

mssql.connect(config, (err) => {
    if (err) throw new Error(err);
});

exports.query = function (sql) {
    return new Promise((resolve, reject) => {
        const request = new mssql.Request();
        request.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.recordset);
            }
        }); 
    });
};