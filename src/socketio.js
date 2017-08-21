// @flow

import debug from 'debug';
import connect from 'socket.io-client';

const log = {};

// TODO: move extracting debug label to config too
const debugLabel = 'atom';

log.info = (data, time = new Date()) => {
  const date = new Date(time);
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  const dbg = debug(`[${timeString}]:${debugLabel}:info`);
  dbg.color = debug.colors[15];
  dbg(data);
};

log.atom = (data, time) => {
  const date = new Date(time);
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  const dbg = debug(`[${timeString}]:${debugLabel}:state`);
  dbg.color = 'green';
  dbg(data);
};

log.err = debug(`${debugLabel}:error`);
log.err.color = 'red';

debug.enable(`*:${debugLabel}:*`);

log.info('booting Atom console');

const socket = connect('http://localhost:31337');
socket.on('connect', () => {
  log.info('connected');

  socket.on('state', (data) => {
    log.atom(data.content, data.time);
  });
  socket.on('handshake', (data) => {
    log.info(data.content, data.time);
    socket.emit('handshake', {
      content: 'Hello from client!',
      time: new Date(),
    });
  });
  socket.on('reconnect', attemptNumber => log.err(`Reconnecting with attempt number ${attemptNumber}`));

  socket.on('disconnect', reason => log.err(`Disconnected with reason ${reason}`));

  socket.on('error', error => log.err(`Error ${error}`));
});
