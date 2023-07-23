import url from './url.js';

async function login(user) {
  // eslint-disable-next-line no-undef
  const response = await axios.post(`${url}/login`, user);
  const { data } = response;

  return data.authenticated === true;
}

export default login;
