import TokenModel from '../Models/TokenModel.js';
import { authenticate, defineTokenCookies } from '../Utils/auth.js';

class Auth {
  static async login(req, res) {
    const data = req.body;

    const { email } = data;
    const { password } = data;

    const authenticated = await authenticate(email, password);

    if (authenticated) {
      try {
        const accessToken = TokenModel.createAccessToken(email);
        const refreshToken = await TokenModel.createRefreshToken(email);

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
      const accessToken = TokenModel.createAccessToken(email);
      const refreshToken = await TokenModel.createRefreshToken(email);

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
      await TokenModel.revokeUserTokens(accessToken, refreshToken);
      defineTokenCookies(req, res);

      return res.status(200).json({ left: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default Auth;
