import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com';

const API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
const END_POINT = '/search/photos';

// export function getPhotos(query) {
//   const params = new URLSearchParams({
//     query,
//     page: 1,
//     per_page: 12,
//     orientation: 'portrait',
//     client_id: API_KEY,
//   });
//   return fetch(`${BASE_URL}${END_POINT}/?${params}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   });
// }

export const getPhotos = query => {
  return axios.get(`${END_POINT}`, {
    params: {
      query,
      page: 1,
      per_page: 12,
      orientation: 'portrait',
      client_id: API_KEY,
    },
  });
};
