class FetchApi {
  static baseUrl = () => {
    throw new Error('Base URL is not set for an API class');
  };

  static uid() {
    return window.localStorage.getItem('uid');
  }
  static client() {
    return window.localStorage.getItem('client');
  }
  static accessToken() {
    return window.localStorage.getItem('access-token');
  }

  /**
   *
   * @param {string} url
   * @param {object} options
   * @return {Promise}
   */
  static async request(url, options = {}) {
    const newUrl = `${this.baseUrl()}${url}`;
    if (!options.headers) {
      options.headers = {};
    }

    if (!options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }

    if (!options.credentials) {
      options.credentials = 'include';
    }

    options.headers.uid = this.uid();
    options.headers.client = this.client();
    options.headers['access-token'] = this.accessToken();

    options.keepalive = true;

    try {
      const response = await fetch(newUrl, options);

      return {
        response,
        json: response.ok
          ? await response.json()
          : JSON.parse(response.body && (await response.text())),
      };
    } catch (e) {
      console?.error(
        `
FetchAPI error
Url: ${newUrl}
Headers: ${JSON.stringify(options.headers, null, 2)}
Error: `,
        e,
      );

      return {
        response: {
          ok: false,
          error: e,
        },
        json: undefined,
      };
    }
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @return {Promise}
   */
  static post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @return {Promise}
   */
  static put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @return {Promise}
   */
  static patch(url, data = {}) {
    return this.request(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Returns query string without question mark(?)
   * @param {object} params
   * @return {string}
   */
  static encodeQueryParams(params = {}) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

  /**
   * Makes full URL with query string
   * @param {string} url
   * @param {object} params
   * @returns {string}
   */
  static urlWithParams(url, params = {}) {
    return `${url}${
      Object.keys(params).length > 0 ? `?${FetchAPI.encodeQueryParams(params)}` : ''
    }`;
  }

  /**
   *
   * @param {string} url
   * @param {object} params
   * @return {Promise}
   */
  static get(url, params = {}) {
    return this.request(FetchAPI.urlWithParams(url, params));
  }

  /**
   *
   * @param {string} url
   * @param {object} params
   * @return {Promise}
   */
  static deleteRequest(url, params) {
    return this.request(FetchAPI.urlWithParams(url, params), {
      method: 'DELETE',
    });
  }
}

export default FetchApi;
