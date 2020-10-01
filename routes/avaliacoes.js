const express = require('express');
const router = express.Router();
const mssql = require('../mssql');
const request = new mssql.Request();

router.get('/listar', (req, res, next) => {
    let sql = 'SELECT * FROM AVALIACAO';
    let retorno = query(sql);
    res.status(200).send(retorno);
});

router.post('/inserir', (req, res, next) => {
    const av = req.body;
    let sql = 'INSERT INTO AVALIACAO';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/get/:conteudo', (req, res, next) => {
    const params = req.params.conteudo;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/get/id/:id', (req, res, next) => {
    const params = req.params.id;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/minhas/:idcliente', (req, res, next) => {
    const params = req.params.idcliente;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno);
});

router.get('/minhas/iduser/:iduser', (req, res, next) => {
    const params = req.params.iduser;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno);
});

router.get('/listar/:idempresa', (req, res, next) => {
    const params = req.params.idempresa;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno);
});

router.post('/responder', (req, res, next) => {
    const params = req.bod;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/resposta/get/:idavaliacao', (req, res, next) => {
    const params = req.params.idavaliacao;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/resposta/listar/cliente/:idcliente', (req, res, next) => {
    const params = req.params.idcliente;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno);
});

router.delete('/delete/:idavaliacao', (req, res, next) => {
    const params = req.params.idavaliacao;
    let sql = '';
    let retorno = query(sql);
    res.status(200).send(retorno[0]);
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