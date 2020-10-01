const express = require('express');
const router = express.Router();
const mssql = require('../mssql');
const request = new mssql.Request();

router.post('/inserir', (req, res, next) => {
    let user = req.body;
    let sql = `INSERT INTO USUARIO(USERNAME, SENHA, EMAIL, PERFIL, LOGADO)` +
    `VALUES (${user.login}, ${user.senha}, ${user.email}, ${user.perfil}, 0`;
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
    let sql = `SELECT * FROM USUARIO WHERE IDUSUARIO = ${req.params.login}`;
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

router.get('/logout/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = ``;
    let retorno = query(sql);
    return res.status(200).send(retorno);
});

router.post('/verifylogin/:idusuario', (req, res, next) => {
    const params = req.params.idusuario;
    let sql = ``;
    let retorno = query(sql);
    return res.status(200).send(retorno);
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

function query(sql) {function query(sql) {
    request.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return new Error(err);
        }

        return result.recordset;
    });
}
    request.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return new Error(err);
        }

        return result.recordset;
    });
}

module.exports = router;