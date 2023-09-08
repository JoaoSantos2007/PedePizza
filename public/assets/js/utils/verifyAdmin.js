import verifyUser from './verifyUser.js';

const verifyAdmin = async () => {
  const response = await verifyUser();

  if (!response) return response;

  return response.admin;
};

export default verifyAdmin;
