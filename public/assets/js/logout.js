const logout = async () => {
  // eslint-disable-next-line no-undef
  const response = await axios.post('/logout');

  return response.status === 200;
};

export default logout;
