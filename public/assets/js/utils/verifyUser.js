import User from '../requests/User.js';

const verifyUser = async () => {
  try {
    const response = await User.get();
    return response;
  } catch {
    return false;
  }
};

export default verifyUser;
