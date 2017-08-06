// @flow

// import unirest from 'unirest';
import R from 'ramda';

import * as api from './api';

const appleUser = api.usersR('apple');
appleUser.end(resp => console.log({ r: R.map(R.toUpper, R.keysIn(R.prop('body', resp))) }));

