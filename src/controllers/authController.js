import UnathorizedError from '../errors/unathorizedError.js';
import Token from '../models/tokenModel.js';
import { authenticate, defineTokenCookies } from '../utils/authUtils.js';

class Auth {
  static async login(req, res, next) {
    try {
      const data = req.body;
      const { email, password } = data;

      const authenticated = await authenticate(email, password);

      if (!authenticated) throw new UnathorizedError('Email or password is incorrect!');

      const accessToken = Token.createAccessToken(email);
      const refreshToken = await Token.createRefreshToken(email);

      defineTokenCookies(req, res, accessToken, refreshToken);
      return res.status(200).json({ success: true, authenticated: true });
    } catch (err) {
      return next(err);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const email = await Token.verifyRefreshToken(refreshToken);

      const newAccessToken = Token.createAccessToken(email);
      const newRefreshToken = await Token.createRefreshToken(email);

      defineTokenCookies(req, res, newAccessToken, newRefreshToken);
      return res.status(200).json({ success: true, refreshed: true });
    } catch (err) {
      return next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const { accessToken, refreshToken } = req.cookies;

      await Token.revokeUserTokens(accessToken, refreshToken);
      defineTokenCookies(req, res);

      return res.status(200).json({ success: true, left: true });
    } catch (err) {
      return next(err);
    }
  }
}

export default Auth;
