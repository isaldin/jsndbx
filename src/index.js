// @flow

import Hapi from 'hapi';
import * as inert from 'inert';
import debug from 'debug';
import Server from 'socket.io';

const log = debug('*');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 31337,
});

const listener = server.listener;
const io = new Server(listener);
io.on('connection', (socket) => {
  log('user connected');

  socket.emit('handshake', {
    content: 'Hello from the server!',
    time: new Date(),
  });
  socket.emit('state', {
    content: { router: { nest: 1 } },
    time: new Date(),
  });

  socket.on('state', (data) => {
    socket.broadcast.emit('state', data);
  });

  socket.on('disconnect', (reason) => {
    log(`user disconnected with reason ${reason}`);
  });
});

server.register(inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/socketio.js',
    handler: (request, reply) => reply.file('_socketio.js'),
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.file('./public/index.html').type('text/html').code(200),
  });

  server.start((errStart) => {
    if (errStart) throw errStart;
    log(`Server running at: ${server.info.uri}`);
  });
});
