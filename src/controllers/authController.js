import Token from '../models/tokenModel.js';
import authenticate from '../utils/authenticate.js';
import defineCookies from '../utils/defineCookies.js';
import refresh from '../utils/refresh.js';

class Auth {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authenticate(email, password);
      const accessToken = Token.createAccessToken(email);
      const refreshToken = await Token.createRefreshToken(email);

      defineCookies(req, res, accessToken, refreshToken);
      return res.status(200).json({ success: true, authenticated: true, user });
    } catch (err) {
      return next(err);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { newAccessToken, newRefreshToken } = await refresh(refreshToken);

      defineCookies(req, res, newAccessToken, newRefreshToken);
      return res.status(200).json({ success: true, refreshed: true });
    } catch (err) {
      return next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const { accessToken, refreshToken } = req.cookies;

      await Token.revokeUserTokens(accessToken, refreshToken);

      defineCookies(req, res);
      return res.status(200).json({ success: true, left: true });
    } catch (err) {
      return next(err);
    }
  }
}

export default Auth;
