const express = require('express');
const router = express.Router();
const mssql = require('../mssql');

router.get('/pesquisa/:empresa', (req, res) => {
    const params = req.params.empresa;
    const sql = `select * from usuario, empresa where usuario.username like'%${params}%' and usuario.idusuario = empresa.idusuario`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

router.get('/get/id/:idempresa', (req, res) => {
    const params = req.params.idempresa;
    const sql = `SELECT * FROM USUARIO, EMPRESA WHERE EMPRESA.IDEMPRESA = ${params} AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/get/id/user/:userid', (req, res) => {
    const params = req.params.userid;
    const sql = `SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.IDUSUARIO = ${params} AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/get/nome/:nome', (req, res) => {
    const params = req.params.nome;
    const sql = `SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.USERNAME = '${params}' AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/listar', (req, res) => {
    const sql = 'SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO';
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

module.exports = router;