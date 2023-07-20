import spawnError from '../spawnError.js';
import url from '../url.js';

async function login(user) {
  try {
    const response = await axios.post(`${url}/login`, user);
    if (response.status !== 200) return false;

    return true;
  } catch (err) {
    console.log(err.response);
    spawnError({ name: 'Authentication Failed', msg: 'E-mail or Password is incorrect!' });

    return false;
  }
}

export default login;
