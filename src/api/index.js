import * as unirest from 'unirest';

const baseURI = 'https://www.googleapis.com/youtube/v3';
const get = (path) => unirest.get(baseURI + path);

export const search = (query) =>
  get('/search')
    .query({
      maxResults: '25',
      part: 'snippet',
      q: query,
      type: '',
    })
    .query('key', 'AIzaSyAYgYhyWjjAmrrFw7iA_RMlpGr-kGhVNbY')
    .end;
