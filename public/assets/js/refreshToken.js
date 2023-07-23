import url from './url.js';

const refreshToken = async () => {
  // eslint-disable-next-line no-undef
  const response = await axios.post(`${url}/refresh`);

  return response.status === 200;
};

export default refreshToken;
