const express = require('express');
const router = express.Router();
const mssql = require('../mssql');
const request = new mssql.Request();

router.get('/get/:login', (req, res, next) => {
    const params = req.params.login;
    const sql = '';
    let retorno = query(sql);
    return res.status(200).send(retorno);
});

router.post('/inserir', (req, res, next) => {
    const body = req.body;
    let sql = '';
    let retorno = query(sql);

    return res.status(200).send(retorno);
});

router.post('/get/id//user/:userid', (req, res, next) => {
    let params = req.params.userid;
    let sql = '';
    let retorno = query(sql);

    return res.status(200).send(retorno);
});

router.put('/forget', (req, res, next) => {
    const body = req.body;
    let sql = '';
    let retorno = query(sql);

    return res.status(200).send(retorno);
});

function query(sql) {
    request.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return new Error(err);
        }

        return result.recordset;
    });
}

module.exports = router;