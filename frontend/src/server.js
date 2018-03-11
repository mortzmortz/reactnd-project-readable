import axios from 'axios';

const port = 3001;
const baseURL = `http://localhost:${port}`;

export const getData = (endpoint = '/') =>
  axios.create({
    method: 'GET',
    baseURL: `${baseURL}${endpoint}`,
    headers: {
      Authorization: Math.random()
        .toString(36)
        .substr(-8),
    },
  })();

export const postData = (endpoint = '/', data = {}) =>
  axios.create({
    method: 'POST',
    baseURL: `${baseURL}${endpoint}`,
    data,
    headers: {
      Authorization: Math.random()
        .toString(36)
        .substr(-8),
    },
  })();

export const putData = (endpoint = '/', data = {}) =>
  axios.create({
    method: 'PUT',
    baseURL: `${baseURL}${endpoint}`,
    data,
    headers: {
      Authorization: Math.random()
        .toString(36)
        .substr(-8),
    },
  })();

export const deleteData = (endpoint = '/', data = {}) =>
  axios.create({
    method: 'DELETE',
    baseURL: `${baseURL}${endpoint}`,
    data,
    headers: {
      Authorization: Math.random()
        .toString(36)
        .substr(-8),
    },
  })();
