import axios from 'axios';

const apikey = '8c963a6'; // If using secret key, move to .evn.local

export const getPosters = (query = '', isId = false, page = 1) => {
  return axios
    .get('https://www.omdbapi.com', {
      params: {
        apikey,
        page,
        ...(isId ? { i: query } : { s: query || 'man' }),
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('err', err);
    });
};
