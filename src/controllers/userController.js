import Token from '../models/tokenModel.js';
import UserModel from '../models/userModel.js';
import { defineTokenCookies } from '../utils/authUtils.js';
import { hashPassword } from '../utils/userUtils.js';

class User {
  // create user
  static async create(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = new UserModel({
        name,
        email,
        hashPassword: hashPassword(password),
        admin: false,
        cart: {},
      });

      await user.save();

      return res.status(201).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  // read user
  static get(req, res) {
    return res.status(200).json({ success: true, user: req.user });
  }

  // updtate user
  static async update(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;

      if (name) {
        user.set('name', name);
      }

      await user.validate();
      await user.save();

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }

  // delete user
  static async delete(req, res, next) {
    try {
      const { user } = req;
      const { accessToken, refreshToken } = req.cookies;

      await user.deleteOne({ _id: user.id });
      await Token.revokeUserTokens(accessToken, refreshToken);
      defineTokenCookies(req, res);

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  }
}

export default User;
