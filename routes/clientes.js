const express = require('express');
const router = express.Router();
const mssql = require('../mssql');

router.get('/', (req, res, next) => {

    let request = new mssql.Request();
    request.query('select * from usuario', (err, result) => {
        if (err) {
            return res.send({
                erro: {
                    message: err.message
                }
            });
        }
        return res.status(200).send(result);
    });

});

module.exports = router;