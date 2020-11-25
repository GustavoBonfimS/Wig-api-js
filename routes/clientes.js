const express = require('express');
const router = express.Router();
const mssql = require('../database/mssql');

router.get('/get/:login', async (req, res) => {
  const params = req.params.login;
  const sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.login = '${params}' AND USUARIO.IDUSUARIO = CLIENTE.IDUSUARIO`;
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(!result[0] ? 'null' : result[0]))
    .catch((err) => res.status(500).send(err));
});

router.post('/cadastrar', async (req, res) => {
  const body = req.body;
  let sql =
    `INSERT INTO USUARIO(login, SENHA, EMAIL, PERFIL, LOGADO)` +
    `VALUES ('${body.login}', '${body.senha}', '${body.email}', '${body.perfil}', 0)`;
  await mssql
    .query(sql)
    .then(() => {
      sql = `INSERT INTO CLIENTE(IDUSUARIO, CPF) VALUES ((SELECT IDUSUARIO FROM USUARIO WHERE login = '${body.login}'), '${body.cpf}')`;
      mssql.query(sql).then(() => {
        sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.login = '${body.login}'`;
        mssql.query(sql).then((result) => {
          return res.status(200).send(!result[0] ? 'null' : result[0]);
        });
      });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

router.get('/get/id/user/:userid', async (req, res) => {
  let params = req.params.userid;
  let sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.IDUSUARIO = ${params} AND USUARIO.IDUSUARIO = CLIENTE.IDUSUARIO`;
  await mssql
    .query(sql)
    .then((result) => res.status(200).send(!result[0] ? 'null' : result[0]))
    .catch((err) => res.status(500).send(err));
});

router.put('/forget', async (req, res) => {
  const body = req.body;
  let sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.EMAIL = '${body.email}'`;
  await mssql
    .query(sql)
    .then((result) => {
      if (!result[0]) {
        return res.status(500).send('null');
      }
      sql = `UPDATE USUARIO SET SENHA = '${body.senha}' WHERE EMAIL = '${body.email}'`;
      mssql.query(sql).then();
      sql = `SELECT * FROM USUARIO, CLIENTE WHERE USUARIO.EMAIL = '${body.email}'`;
      mssql.query(sql).then((result) => res.status(200).send(result[0]));
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
