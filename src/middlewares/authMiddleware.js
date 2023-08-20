import NotFoundError from '../errors/notFoundError.js';
import UnathorizedError from '../errors/unathorizedError.js';
import Token from '../models/tokenModel.js';
import User from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';

class Auth {
  static async verifyAuthorization(req, res, next) {
    try {
      const { accessToken } = await Token.verifyExpiredTokensAndRefresh(req, res);

      const payload = await Token.verifyAccessToken(accessToken);
      const user = await User.findOne({ email: payload.email }, '-hashPassword');

      if (user === null) throw new NotFoundError('User not found!');

      req.user = user;
      return next();
    } catch (err) {
      // console.log(err);
      return ErrorHandler(err, res);
    }
  }

  static async verifyAdmin(req, res, next) {
    try {
      const { accessToken } = req.cookies;

      const payload = await Token.verifyAccessToken(accessToken);
      const user = await User.findOne({ email: payload.email });

      if (user === null) throw new NotFoundError('User not found!');
      if (!user.admin) throw new UnathorizedError('You need Admin!', 403);

      req.user = user;
      return next();
    } catch (err) {
      return ErrorHandler(err, res);
    }
  }
}

export default Auth;
