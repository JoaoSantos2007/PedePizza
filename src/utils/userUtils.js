import bcrypt from 'bcrypt';
import { SALT } from './env.js';

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT);
}

export { hashPassword };
