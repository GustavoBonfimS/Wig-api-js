const express = require('express');
const router = express.Router();
const mssql = require('../database/mssql');

router.get('/listar', (req, res, next) => {
    const sql = `SELECT * FROM AVALIACAO`;
    let retorno = mssql.query(sql);
    console.log(retorno);

    return res.status(200).json(retorno);
});

router.post('/inserir', (req, res, next) => {
    const av = req.body;
    let sql = `INSERT INTO AVALIACAO VALUES (${av.idcliente}, ${av.idempresa}, '${av.autor}', '${av.conteudo}', '${av.data}', '${av.hora}')`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno[0]);
});

router.post('/responder', (req, res, next) => {
    const body = req.bod;
    let sql = `INSERT INTO RESPOSTA VALUES (${body.idavaliacao}, ${body.idempresa}, ${body.idcliente}, '${body.data}', '${body.hora}', '${body.autor}', '${body.conteudo}')`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.get('/get/:conteudo', (req, res, next) => {
    const params = req.params.conteudo;
    let sql = `SELECT * FROM AVALIACAO WHERE CONTEUDO = '${params}'`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/get/id/:id', (req, res, next) => {
    const params = req.params.id;
    let sql = `SELECT * FROM AVALIACAO WHERE IDAVALIACAO = ${params}`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.get('/minhas/:idcliente', (req, res, next) => {
    const params = req.params.idcliente;
    let sql = `SELECT * FROM AVALIACAO WHERE IDCLIENTE = ${params} ORDER BY DATA DESC, HORA DESC`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.get('/minhas/iduser/:iduser', (req, res, next) => {
    const params = req.params.iduser;
    let sql = `SELECT * FROM AVALIACAO WHERE IDCLIENTE = (SELECT IDCLIENTE FROM CLIENTE WHERE IDUSUARIO = ${params}) ORDER BY DATA DESC, HORA DESC`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.get('/listar/:idempresa', (req, res, next) => {
    const params = req.params.idempresa;
    let sql = `SELECT * FROM AVALIACAO WHERE IDEMPRESA = ${params} ORDER BY DATA DESC, HORA DESC`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.get('/resposta/get/:idavaliacao', (req, res, next) => {
    const params = req.params.idavaliacao;
    let sql = `SELECT * FROM RESPOSTA WHERE IDAVALIACAO = ${params}`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno[0]);
});

router.get('/resposta/listar/cliente/:idcliente', (req, res, next) => {
    const params = req.params.idcliente;
    let sql = `SELECT * RESPOSTA WHERE IDCLIENTE = ${params} ORDER BY DATA DESC, HORA DESC`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

router.delete('/delete/:idavaliacao', (req, res, next) => {
    const params = req.params.idavaliacao;
    let sql = `DELETE FROM AVALIACAO WHERE IDAVALIACAO = ${params}`;
    let retorno = mssql.query(sql);
    res.status(200).send(retorno);
});

module.exports = router;