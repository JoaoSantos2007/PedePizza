import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Allowlist from './allowlistModel.js';
import Blocklist from './blocklistModel.js';
import { ACCESSTOKEN_LIFETIME, SECRET } from '../utils/env.js';

class Token {
  static createAccessToken(email) {
    const accessToken = jwt.sign({
      email,
    }, SECRET, {
      expiresIn: `${ACCESSTOKEN_LIFETIME}m`,
    });

    return accessToken;
  }

  static async createRefreshToken(email) {
    const refreshToken = crypto.randomBytes(24).toString('hex');

    try {
      await Allowlist.create({
        key: refreshToken,
        value: email,
      });
    } catch (err) {
      throw err;
    }

    return refreshToken;
  }

  static verifyAccessToken(accessToken, callback) {
    jwt.verify(accessToken, SECRET, (err, payload) => {
      callback(err, payload);
    });
  }

  static async revokeUserTokens(accessToken, refreshToken) {
    try {
      await Allowlist.deleteOne({
        key: refreshToken,
      });

      await Blocklist.create({
        key: accessToken,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Token;
