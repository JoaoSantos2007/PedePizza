import UnathorizedError from '../errors/unathorizedError.js';
import User from '../models/userModel.js';
import hashPassword from './hashPassword.js';

async function authenticate(email, password) {
  const user = await User.findOne({
    email,
    hashPassword: hashPassword(password),
  });

  if (user === null) throw new UnathorizedError('The email or password provided is incorrect!');

  return user;
}

export default authenticate;
