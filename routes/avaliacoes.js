const Router = require('express-promise-router');
const router = new Router();
const mssql = require('../database/mssql');

router.get('/listar', async(req, res) => {
    const sql = `SELECT * FROM AVALIACAO`;
    await mssql.query(sql).then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

router.post('/inserir', async(req, res) => {
    const av = req.body;
    let sql = `INSERT INTO AVALIACAO VALUES (${av.idcliente}, ${av.idempresa}, '${av.autor}', '${av.conteudo}', '${av.data}', '${av.hora}')`;
    await mssql.query(sql).then(() => {
        sql = `SELECT * FROM AVALIACAO WHERE DATA = ${av.data} AND HORA = ${av.hora}`;
        mssql.query(sql).then(result => res.status(200).send(result[0]));
    }).catch(err => res.status(500).send(err));
});

router.post('/responder', async(req, res) => {
    const body = req.body;
    let sql = `INSERT INTO RESPOSTA VALUES (${body.idavaliacao}, ${body.idempresa}, ${body.idcliente}, '${body.data}', '${body.hora}', '${body.autor}', '${body.conteudo}')`;
    await mssql.query(sql).then(() => {
        sql = `SELECT * FROM RESPOSTA WHERE DATA = ${body.data} AND HORA = ${body.hora}`;
        mssql.query(sql).then(result => res.status(200).send(result[0]));
    }).catch(err => res.status(500).send(err));
});

router.get('/get/:conteudo', async(req, res) => {
    const params = req.params.conteudo;
    let sql = `SELECT * FROM AVALIACAO WHERE CONTEUDO = '${params}'`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/get/id/:id', async(req, res) => {
    const params = req.params.id;
    let sql = `SELECT * FROM AVALIACAO WHERE IDAVALIACAO = ${params}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/minhas/:idcliente', async(req, res) => {
    const params = req.params.idcliente;
    let sql = `SELECT * FROM AVALIACAO WHERE IDCLIENTE = ${params} ORDER BY DATA DESC, HORA DESC`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result))
        .catch(err => res.status(500).send(err));
});

router.get('/minhas/iduser/:iduser', async(req, res) => {
    const params = req.params.iduser;
    let sql = `SELECT * FROM AVALIACAO WHERE IDCLIENTE = (SELECT IDCLIENTE FROM CLIENTE WHERE IDUSUARIO = ${params}) ORDER BY DATA DESC, HORA DESC`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result))
        .catch(err => res.status(500).send(err));
});

router.get('/listar/:idempresa', async(req, res) => {
    const params = req.params.idempresa;
    let sql = `SELECT * FROM AVALIACAO WHERE IDEMPRESA = ${params} ORDER BY DATA DESC, HORA DESC`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result))
        .catch(err => res.status(500).send(err));
});

router.get('/resposta/get/:idavaliacao', async(req, res) => {
    const params = req.params.idavaliacao;
    let sql = `SELECT * FROM RESPOSTA WHERE IDAVALIACAO = ${params}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/resposta/listar/cliente/:idcliente', async(req, res) => {
    const params = req.params.idcliente;
    let sql = `SELECT * RESPOSTA WHERE IDCLIENTE = ${params} ORDER BY DATA DESC, HORA DESC`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result))
        .catch(err => res.status(500).send(err));
});

router.delete('/delete/:idavaliacao', async(req, res) => {
    const params = req.params.idavaliacao;
    let sql = `DELETE FROM AVALIACAO WHERE IDAVALIACAO = ${params}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? 'null' : result[0]))
        .catch(err => res.status(500).send(err));
});

module.exports = router;