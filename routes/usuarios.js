const express = require('express');
const router = express.Router();
const mssql = require('./database/mssql');

router.post('/inserir', (req, res, next) => {
    let user = req.body;
    let sql = `INSERT INTO USUARIO(USERNAME, SENHA, EMAIL, PERFIL, LOGADO)` +
        `VALUES ('${user.login}', '${user.senha}', '${user.email}', '${user.perfil}', 0`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

router.get('/get/:login', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${req.params.login}'`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

router.get('/get/id/:iduser', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO WHERE IDUSUARIO = ${req.params.iduser}`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

router.post('/login', (req, res) => {
    const body = req.body;
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${body.login}' AND SENHA = '${body.senha}'`;
    let retorno = mssql.query(sql);

    if (retorno[0] === undefined || retorno[0] === null) {
        return res.send(null);
    }

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

    return res.status(200).send(retorno[0]);
});

router.get('/logout/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = `UPDATE USUARIO SET LOGADO = 0 WHERE IDUSUARIO = ${params.idusuario}`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/verifylogin/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = `SELECT LOGADO FROM USUARIO WHERE IDUSUARIO = ${params.idusuario}`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/list', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO`;
    let retorno = mssql.query(sql);
    return res.status(200).send(retorno);
});

module.exports = router;