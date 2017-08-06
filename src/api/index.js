// @flow

import * as unirest from 'unirest';
import R from 'ramda';

export const withDefaultUrl = (path: string) => `https://api.github.com${path}`;

export const addDefaultUserAgent = (request) => {
  request.header({
    'User-Agent': 'TestGithubClient',
  });
  return request;
};

export const request = (url: string) => unirest.get(url);

export const user = (userName: string) => `/users/${userName}`;

export const usersR = R.pipe(
  user,
  withDefaultUrl,
  request,
  addDefaultUserAgent,
);
