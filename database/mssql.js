const mssql = require('mssql');
const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: 'localhost',
    database: 'wig'
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