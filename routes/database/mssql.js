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

module.exports = mssql;