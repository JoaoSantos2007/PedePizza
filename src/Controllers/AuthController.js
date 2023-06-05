import Token from '../models/tokenModel.js';
import { authenticate, defineTokenCookies } from '../utils/authUtils.js';

class Auth {
  static async login(req, res) {
    const data = req.body;

    const { email, password } = data;

    const authenticated = await authenticate(email, password);

    if (authenticated) {
      try {
        const accessToken = Token.createAccessToken(email);
        const refreshToken = await Token.createRefreshToken(email);

        defineTokenCookies(req, res, accessToken, refreshToken);
        return res.status(200).json({ authenticated: true });
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    return res.status(401).send({ msg: 'Incorrect login!' });
  }

  static async refresh(req, res) {
    const { email } = req;

    try {
      const accessToken = Token.createAccessToken(email);
      const refreshToken = await Token.createRefreshToken(email);

      defineTokenCookies(req, res, accessToken, refreshToken);
      return res.status(200).json({ refreshed: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static async logout(req, res) {
    const { accessToken } = req.cookies;
    const { refreshToken } = req.cookies;

    try {
      await Token.revokeUserTokens(accessToken, refreshToken);
      defineTokenCookies(req, res);

      return res.status(200).json({ left: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default Auth;
