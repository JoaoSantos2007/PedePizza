import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Allowlist from './allowlistModel.js';
import Blocklist from './blocklistModel.js';
import { ACCESSTOKEN_LIFETIME, SECRET } from '../utils/env.js';
import UnathorizedError from '../errors/unathorizedError.js';

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
    try {
      const refreshToken = crypto.randomBytes(24).toString('hex');

      await Allowlist.create({
        key: refreshToken,
        value: email,
      });

      return refreshToken;
    } catch (err) {
      return err;
    }
  }

  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, SECRET);
  }

  static async verifyRefreshToken(refreshToken) {
    if (!refreshToken) throw new UnathorizedError('Invalid refresh token!');

    const refreshTokenData = await Allowlist.findOneAndDelete({ key: refreshToken });
    if (!refreshTokenData) throw new UnathorizedError('Invalid refresh token!');

    const email = refreshTokenData.value;
    return email;
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
