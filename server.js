const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`connected!, hello ${socket.id}`);

  io.emit('newNotification', {
    autor: 'teste',
    conteudo: 'contueod teste'
  });
})

server.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
