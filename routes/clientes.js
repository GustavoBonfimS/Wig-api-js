const express = require('express');
const router = express.Router();
const mssql = require('../database/mssql');

router.get('/get/:login', (req, res, next) => {
    const params = req.params.login;
    const sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.USERNAME = '${params}' AND USUARIO.IDUSUARIO = CLIENTE.IDUSUARIO`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.post('/cadastrar', (req, res, next) => {
    const body = req.body;
    let sql = `INSERT INTO USUARIO(USERNAME, SENHA, EMAIL, PERFIL, LOGADO)` +
        `VALUES ('${body.login}', '${body.senha}', '${body.email}', '${body.perfil}', 0`;
    let retorno = mssql.query(sql);

    if (!retorno) {
        res.send(null);
        return;
    }
    sql = `INSERT INTO CLIENTE VALUES ((SELECT IDUSUARIO FROM USUARIO WHERE USERNAME = '${body.login}'), '${body.cpf})'`;
    retorno = query(sql);

    return res.status(200).send(retorno);
});

router.get('/get/id/user/:userid', (req, res, next) => {
    let params = req.params.userid;
    let sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.IDUSUARIO = ${params} AND USUARIO.IDUSUARIO = CLIENTE.IDUSUARIO`;
    let retorno = mssql.query(sql);

    return res.status(200).send(retorno[0]);
});

router.put('/forget', (req, res, next) => {
    const body = req.body;
    let sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.EMAIL = '${body.email}'`;
    let retorno = mssql.query(sql);

    if (!retorno) {
        res.send(null);
        return;
    }
    sql = `UPDATE USUARIO SET SENHA = '${body.senha}' WHERE EMAIL = '${body.email}'`;
    mssql.query(sql);

    sql = `SELECT * FROM USUARIO WHERE USERNAME = '${body.login}' AND SENHA = '${body.senha}'`;
    retorno = mssql.query(sql);
    switch (retorno[0].perfil) {
        case 'cliente':
            sql = `SELECT * FROM USUARIO, CLIENTE WHERE usuario.username = '${retorno[0].login}' and usuario.idusuario = cliente.idusuario`;
            retorno = mssql.query(sql);
            break;
        case 'empresa':
            sql = `SELECT * FROM USUARIO, EMPRESA WHERE usuario.username = '${retorno[0].login}' and ususuario.idusuario = empresa.idusuario`;
            retorno = mssql.query(sql);
            break;
    }

    return res.status(200).send(retorno);
});

module.exports = router;