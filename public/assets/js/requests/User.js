import '../lib/axios.js';
import url from '../utils/url.js';

class User {
  static async get() {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/user`);
    const { data } = response;
    const { user } = data;

    return user;
  }

  static async post(user) {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/user`, user);
    const { data } = response;

    return data;
  }

  static async delete() {
    // eslint-disable-next-line no-undef
    const response = await axios.delete(`${url}/user`);
    const { data } = response;

    return data;
  }
}

export default User;
