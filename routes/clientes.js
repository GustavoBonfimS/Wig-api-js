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

router.get('/Inserir', (req, res, next) => {

    let request = new mssql.Request();
    request.execute("INSERT INTO USUARIO", (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(true);
    });

});

module.exports = router;