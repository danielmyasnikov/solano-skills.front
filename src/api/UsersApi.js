import FetchAPI from './FetchApi';

class UsersAPI extends FetchAPI {
  static baseUrl() {
    return `${process.env.REACT_APP_API_COURSE}`;
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
