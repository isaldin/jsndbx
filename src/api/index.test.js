import R from 'ramda';

import * as api from './index';

describe('api', () => {
  test('Requests', () => {
    test('request correct works', () => {
      const request = api.request('some_uri');
      expect(request.options.method).toBe('get');
      expect(request.options.url).toBe('some_uri');
    });

    test('decorators', () => {
      test('addDefaultUserAgent correct works', () => {
        const request = api.request('some_uri');
        const result = api.addDefaultUserAgent(request);
        expect(result.options).toEqual({
          method: 'get',
          url: 'some_uri',
          headers: {
            'User-Agent': 'TestGithubClient',
          },
        });
      });
    });
  });

  test('Ramda', () => {
    test('usersR() should work exactly as users()', () => {
      const usersRes = api.users('test');
      const usersRRes = api.usersR('test');
      const options = R.prop('options');
      expect(options(usersRRes)).not.toBeUndefined();
      expect(options(usersRRes)).toEqual(options(usersRes));
    });
  });
});
