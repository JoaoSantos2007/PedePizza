import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const ACCESSTOKEN_LIFETIME = process.env.ACCESSTOKEN_LIFETIME || 15;
const REFRESHTOKEN_LIFETIME = process.env.REFRESHTOKEN_LIFETIME || 52;
const UPLOAD_PATH = process.env.UPLOAD_PATH || path.resolve('./uploads');
const { DATABASE_NAME } = process.env;
const { MONGO_URL } = process.env;
const { SALT } = process.env;
const { SECRET } = process.env;

if (!MONGO_URL || !SALT || !SECRET || !DATABASE_NAME) {
  throw new Error('It is missing the Environment Variables in the .env file at the root of the project!');
}

export {
  PORT, REFRESHTOKEN_LIFETIME, ACCESSTOKEN_LIFETIME, UPLOAD_PATH, MONGO_URL, SALT, SECRET, DATABASE_NAME,
};
