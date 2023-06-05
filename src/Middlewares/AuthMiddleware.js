import Allowlist from '../models/allowlistModel.js';
import Token from '../models/tokenModel.js';
import User from '../models/userModel.js';

class Auth {
  static verifyAuthorization(req, res, next) {
    const { accessToken } = req.cookies;

    return Token.verifyAccessToken(accessToken, async (err, payload) => {
      if (err) return res.status(401).json(err);

      await User.findOne({ email: payload.email }).exec()
        .then((user) => {
          if (!user) return res.status(401).json({ error: 'user not found!' });

          req.user = user;
          return next();
        })
        .catch((err) => res.status(500).json(err));
    });
  }

  static async verifyAdmin(req, res, next) {
    const { accessToken } = req.cookies;

    return Token.verifyAccessToken(accessToken, async (err, payload) => {
      if (err) return res.status(400).json(err);

      await User.findOne({ email: payload.email }).exec()
        .then((user) => {
          if (!user) return res.status(400).json({ error: 'user not found!' });

          req.user = user;
          if (user.admin === true) return next();
          return res.status(400).json({ err: 'you need admin!' });
        })
        .catch((err) => res.status(500).json(err));
    });
  }

  static async refresh(req, res, next) {
    const { refreshToken } = req.cookies;

    try {
      const refreshTokenData = await Allowlist.findOneAndDelete({ key: refreshToken });
      if (!refreshToken || !refreshTokenData) return res.status(401).json({ error: 'Invalid refresh token!' });

      const email = refreshTokenData.value;
      req.email = email;

      return next();
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default Auth;
