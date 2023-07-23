import url from './url.js';

const createUser = async (user) => {
  // eslint-disable-next-line no-undef
  const response = await axios.post(`${url}/user`, user);

  return response.status === 201;
};

export default createUser;
