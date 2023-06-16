import UserModel from '../models/userModel.js';
import { hashPassword } from './userUtils.js';

async function authenticate(email, password) {
  const user = await UserModel.findOne({
    email,
    hashPassword: hashPassword(password),
  }).exec();

  return (!!user === true && user.email === email && user.hashPassword === hashPassword(password));
}

function defineTokenCookies(req, res, accessToken = '', refreshToken = '') {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: !!req.headers['sec-fetch-mode'],
    sameSite: 'none',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !!req.headers['sec-fetch-mode'],
    sameSite: 'none',
  });
}

export { authenticate, defineTokenCookies };
