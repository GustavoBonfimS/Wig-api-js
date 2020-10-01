const express = require('express');
const router = express.Router();
const mssql = require('../mssql');
const request = new mssql.Request();

router.get('/pesquisa/:empresa', (req, res) => {
    const params = req.params.empresa;
    const sql = '';
    let retrono = query(sql);
    return res.status(200).send(retorno);
});

router.get('/get/id/:idempresa', (req, res) => {
    const params = req.params.idempresa;
    const sql = '';
    let retrono = query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/get/id/user/:userid', (req, res) => {
    const params = req.params.userid;
    const sql = '';
    let retrono = query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/get/nome/:nome', (req, res) => {
    const params = req.params.nome;
    const sql = '';
    let retrono = query(sql);
    return res.status(200).send(retorno[0]);
});

router.get('/listar', (req, res) => {
    const sql = '';
    let retrono = query(sql);
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