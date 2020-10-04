const express = require('express');
const router = express.Router();
const mssql = require('./database/mssql');
const request = new mssql.Request();

router.post('/inserir', (req, res, next) => {
    let user = req.body;
    let sql = `INSERT INTO USUARIO(USERNAME, SENHA, EMAIL, PERFIL, LOGADO)` +
        `VALUES ('${user.login}', '${user.senha}', '${user.email}', '${user.perfil}', 0`;
    request.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send({
                erro: {
                    message: err.message
                }
            });
        }
        return res.status(200).send(true);
    });
});

router.get('/get/:login', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${req.params.login}'`;
    request.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        let retorno = result.recordset[0];
        return res.status(200).send(retorno);
    });
});

router.get('/get/id/:iduser', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO WHERE IDUSUARIO = ${req.params.iduser}`;
    request.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        let retorno = result.recordset[0];
        return res.status(200).send(retorno);
    });
});

router.post('/login', (req, res) => {
    const body = req.body;
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${body.login}' AND SENHA = '${body.senha}'`;
    let retorno = query(sql);

    if (retorno[0] === undefined || retorno[0] === null) {
        return res.send(null);
    }

    switch (retorno[0].perfil) {
        case 'cliente':
            sql = `SELECT * FROM USUARIO, CLIENTE WHERE usuario.username = '${retorno[0].login}' and usuario.idusuario = cliente.idusuario`;
            retorno = query(sql);
            break;
        case 'empresa':
            sql = `SELECT * FROM USUARIO, EMPRESA WHERE usuario.username = '${retorno[0].login}' and ususuario.idusuario = empresa.idusuario`;
            retorno = query(sql);
            break;            
    }

    return res.status(200).send(retorno[0]);
});

router.get('/logout/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = `UPDATE USUARIO SET LOGADO = 0 WHERE IDUSUARIO = ${params.idusuario}`;
    let retorno = query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/verifylogin/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = `SELECT LOGADO FROM USUARIO WHERE IDUSUARIO = ${params.idusuario}`;
    let retorno = query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/list', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO`;
    request.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        let retorno = result.recordset;
        return res.status(200).send(retorno);
    });
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