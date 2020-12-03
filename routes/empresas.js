const Router = require('express-promise-router');
const router = new Router();
const mssql = require('../database/mssql');

router.get('/pesquisa/:empresa', async (req, res) => {
  const params = req.params.empresa;
  const sql = `select * from usuario, empresa where usuario.login like'%${params}%' and usuario.idusuario = empresa.idusuario`;
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(!result[0] ? 'null' : result))
    .catch((err) => res.status(500).send(err));
});

router.get('/get/id/:idempresa', async (req, res) => {
  const params = req.params.idempresa;
  const sql = `SELECT * FROM USUARIO, EMPRESA WHERE EMPRESA.IDEMPRESA = ${params} AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(!result[0] ? 'null' : result[0]))
    .catch((err) => res.status(500).send(err));
});

router.get('/get/id/user/:userid', async (req, res) => {
  const params = req.params.userid;
  const sql = `SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.IDUSUARIO = ${params} AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(!result[0] ? 'null' : result[0]))
    .catch((err) => res.status(500).send(err));
});

router.get('/get/nome/:nome', async (req, res) => {
  const params = req.params.nome;
  const sql = `SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.login = '${params}' AND USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO`;
  await mssql
    .query(sql)
    .then((result) => {
      res.status(200).send(!result[0] ? 'null' : result[0]);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/listar', async (req, res) => {
  const sql =
    'SELECT * FROM USUARIO, EMPRESA WHERE USUARIO.IDUSUARIO = EMPRESA.IDUSUARIO';
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
