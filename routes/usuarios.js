const Router = require('express-promise-router');
const router = new Router();
const mssql = require('../database/mssql');

router.post('/inserir', async(req, res) => {
    let user = req.body;
    let sql = `INSERT INTO USUARIO(USERNAME, SENHA, EMAIL, PERFIL, LOGADO)` +
        `VALUES ('${user.login}', '${user.senha}', '${user.email}', '${user.perfil}', 0)`;
    await mssql.query(sql).then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

router.get('/get/:login', async (req, res) => {
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${req.params.login}'`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? "null" : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/get/id/:iduser', async (req, res) => {
    let sql = `SELECT * FROM USUARIO WHERE IDUSUARIO = ${req.params.iduser}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? "null" : result[0]))
        .catch(err => res.status(500).send(err));
});

router.post('/login', async (req, res) => {
    const body = req.body;
    let sql = `SELECT * FROM USUARIO WHERE USERNAME = '${body.login}' AND SENHA = '${body.senha}'`;
    let retorno = null;
    await mssql.query(sql).then(result => retorno = result).catch(err => res.send(err));

    if (retorno[0] === undefined || retorno[0] === null) {
        return res.send(null);
    }

    switch (retorno[0].perfil) {
        case 'cliente':
            sql = `SELECT * FROM USUARIO, CLIENTE WHERE usuario.username = '${retorno[0].login}' and usuario.idusuario = cliente.idusuario`;
            await mssql.query(sql).then(result => retorno = result).catch(err => res.send(err));
            break;
        case 'empresa':
            sql = `SELECT * FROM USUARIO, EMPRESA WHERE usuario.username = '${retorno[0].login}' and ususuario.idusuario = empresa.idusuario`;
            await mssql.query(sql).then(result => retorno = result).catch(err => res.send(err));
            break;
    }

    res.status(200).send(!result[0] ? "null" : result[0]);
});

router.get('/logout/:idusuario', async (req, res) => {
    const params = req.params.idusuario;
    let sql = `UPDATE USUARIO SET LOGADO = 0 WHERE IDUSUARIO = ${params.idusuario}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? "null" : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/verifylogin/:idusuario', async (req, res) => {
    const params = req.params.idusuario;
    let sql = `SELECT LOGADO FROM USUARIO WHERE IDUSUARIO = ${params.idusuario}`;
    await mssql.query(sql).then(result => res.status(200).send(!result[0] ? "null" : result[0]))
        .catch(err => res.status(500).send(err));
});

router.get('/list', async (req, res) => {
    let sql = `SELECT * FROM USUARIO`;
    await mssql.query(sql).then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

module.exports = router;