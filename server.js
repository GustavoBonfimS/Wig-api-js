const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const emitter = require('./routes/avaliacoes').emitter;

io.on('connection', (socket) => {
  console.log(`connected!, socket id: ${socket.id}`);

  emitter.on('newAnswer', (av) => {
    if (av.idcliente == socket.handshake.query['idCliente']) {
      io.emit('newNotification', av);
    }
  });
});

server.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
