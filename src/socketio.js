// @flow

import debug from 'debug';
import connect from 'socket.io-client';
// import request from 'browser-request';

const info = (data, time = new Date()) => {
  const date = new Date(time);
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  const dbg = debug(`[${timeString}]:atom:info`);
  dbg.color = debug.colors[15];
  dbg(data);
};

const atom = (data, time) => {
  const date = new Date(time);
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  const dbg = debug(`[${timeString}]:atom:state`);
  dbg.color = 'green';
  dbg(data);
};

const err = debug('atom:error');
err.color = 'red';

debug.enable('*:atom:*');


/* eslint-disable */
/* window.require = (name, moduleName) => {
  _require = require;

  if (!moduleName) {
    moduleName = name;
  }

  info(`Fetching ${moduleName} ... just one second`);
  request(`http://wzrd.in/bundle/${moduleName}@latest/`, (er, res, body) => {
    require = null;
    eval(body);
    window[name] = require(moduleName);
    require = _require;
    info('Finished getting ' + moduleName);
  });
}; */
/* eslint-enable */
info('booting Atom console', new Date());

const socket = connect('http://localhost:31337');
socket.on('connect', () => {
  info('connected');

  socket.on('state', (data) => {
    atom(data.content, data.time);
  });
  socket.on('handshake', (data) => {
    info(data.content, data.time);
    socket.emit('handshake', {
      content: 'Hello from client!',
      time: new Date(),
    });
  });
  socket.on('reconnect', attemptNumber => err(`Reconnecting with attempt number ${attemptNumber}`));
  socket.on('disconnect', reason => err(`Disconnected with reason ${reason}`));
  socket.on('error', error => err(`Error ${error}`));
});
