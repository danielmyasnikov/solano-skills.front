import FetchAPI from './FetchApi';
import { env } from '@src/app/config';

class UsersAPI extends FetchAPI {
  static baseUrl() {
    return `${env.api.platform}`;
  }

  static login(login, password) {
    return this.post('/guest/login', { login, password });
  }

  static issueToken() {
    // TODO
    // return this.get('/auth/issue-token');
  }

  // TODO
  static validateToken(token) {
    // return this.post('/auth/validate-token', { token });
  }
}

export default UsersAPI;
