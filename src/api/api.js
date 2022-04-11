import axios from 'axios';
import { env } from '@src/app/config/index.ts';

const makeRequest = async ({ method, url, data, defaultValue = null }) => {
  try {
    const response = await axios({
      method,
      url: `${env.apiUrl}${url}`,
      headers: {
        uid: window.localStorage.getItem('uid'),
        'access-token': window.localStorage.getItem('access-token'),
        client: window.localStorage.getItem('client'),
        expiry: window.localStorage.getItem('expiry'),
      },
      data,
    });
    switch (response.status) {
      case 200:
        return response.data;
      case 204:
      case 205:
        return defaultValue;

      default:
        return defaultValue;
    }
  } catch (err) {
    switch (err.response.status) {
      case 401:
        // TODO: make request for refresh headers.

        window.localStorage.removeItem('uid');
        window.localStorage.removeItem('access-token');
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('expiry');

        return err.response.data;
      case 404:
        window.location.href = '/404';
        break;

      default:
        return err.response.data;
    }
  }
};

export class Api {
  static get(url, defaultValue = null) {
    return makeRequest({ method: 'get', url, defaultValue });
  }

  static post(url, data, defaultValue = null) {
    return makeRequest({ method: 'post', url, data, defaultValue });
  }

  static put(url, data, defaultValue = null) {
    return makeRequest({ method: 'put', url, data, defaultValue });
  }

  static patch(url, data, defaultValue = null) {
    return makeRequest({ method: 'patch', url, data, defaultValue });
  }

  static delete(url, data, defaultValue = null) {
    return makeRequest({ method: 'delete', url, data, defaultValue });
  }
}
