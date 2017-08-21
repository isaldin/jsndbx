// @flow

import request from 'browser-request';

/* eslint-disable */
// TODO: check for env (probably, it would be better switching this feature via bash var)
window.require = (name, moduleName) => {
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
};
/* eslint-enable */
