const express = require('express');
const router = express.Router();
const mssql = require('../mssql');
const request = new mssql.Request();

router.post('/Inserir', (req, res, next) => {
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

router.get('/getUser/:id', (req, res, next) => {
    let sql = `SELECT * FROM USUARIO WHERE IDUSUARIO = ${req.params.id}`;
    request.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        let retorno = result.recordset[0];
        return res.status(200).send(retorno);
    });
});

module.exports = router;