const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//routes
const rotaUsuarios = require('./routes/usuarios');
app.use('/usuario', rotaUsuarios);
const rotaClientes = require('./routes/clientes');
app.use('/cliente', rotaClientes);
const rotaAvaliacoes = require('./routes/avaliacoes');
app.use('/avaliacao', rotaAvaliacoes);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;