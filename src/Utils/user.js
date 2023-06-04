import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { SALT } = process.env;

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT);
}

export { hashPassword };
