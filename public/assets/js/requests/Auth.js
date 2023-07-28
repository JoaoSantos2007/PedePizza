import '../lib/axios.js';

class Auth {
  static async login(user) {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/login', user);
    const { data } = response;

    return data;
  }

  static async logout() {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/logout');
    const { data } = response;

    return data;
  }

  static async refreshToken() {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/refresh');
    const { data } = response;

    return data;
  }
}

export default Auth;
