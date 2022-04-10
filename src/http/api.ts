import axios from 'axios';
import { env } from '@src/app/config';

const api = axios.create({
  baseURL: env.api.platform,
});

// Request interceptor
api.interceptors.request.use(
  (request) => {
    if (request.headers === undefined) {
      request.headers = {};
    }

    const uid = window.localStorage.getItem('uid');
    const accessToken = window.localStorage.getItem('access-token');
    const client = window.localStorage.getItem('client');

    if (uid) {
      request.headers.uid = uid;
    }
    if (accessToken) {
      request.headers['access-token'] = accessToken;
    }
    if (client) {
      request.headers.client = client;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        // TODO: make request for refresh headers.

        window.localStorage.removeItem('uid');
        window.localStorage.removeItem('access-token');
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('expiry');
        break;
      case 404:
        window.location.href = '/404';
        break;

      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
