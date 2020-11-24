require('dotenv/config');
require('express-async-handler');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
const rotaUsuarios = require('./routes/usuarios');
app.use('/usuario', rotaUsuarios);
const rotaClientes = require('./routes/clientes');
app.use('/cliente', rotaClientes);
const rotaAvaliacoes = require('./routes/avaliacoes');
app.use('/avaliacao', rotaAvaliacoes);
const rotaEmpresa = require('./routes/empresas');
app.use('/empresa', rotaEmpresa);

app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
