import '../lib/axios.js';
import url from '../utils/url.js';

class Auth {
  static async login(user) {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/login`, user);
    const { data } = response;

    return data;
  }

  static async logout() {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/logout`);
    const { data } = response;

    return data;
  }

  static async refreshToken() {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/refresh`);
    const { data } = response;

    return data;
  }
}

export default Auth;
