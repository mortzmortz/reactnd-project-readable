import axios from 'axios';

const port = 3001;
const baseURL = `http://localhost:${port}`;
const headers = {
  Authorization: Math.random()
    .toString(36)
    .substr(-8),
};

export const getData = (endpoint = '/') =>
  axios.create({
    method: 'GET',
    baseURL: `${baseURL}${endpoint}`,
    headers,
  })();

export const postData = (endpoint = '/', data = {}) =>
  axios.create({
    method: 'POST',
    baseURL: `${baseURL}${endpoint}`,
    data,
    headers,
  })();

export const editData = (endpoint = '/', data = {}) =>
  axios.create({
    method: 'PUT',
    baseURL: `${baseURL}${endpoint}`,
    data,
    headers,
  })();

export const deleteData = (endpoint = '/') =>
  axios.create({
    method: 'DELETE',
    baseURL: `${baseURL}${endpoint}`,
    headers,
  })();
