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

exports.query = function (sql) {{
    const request = new mssql.Request();
    request.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return new Error(err);
        }
        console.log(result.recordset);
        return result.recordset;
    });
}};