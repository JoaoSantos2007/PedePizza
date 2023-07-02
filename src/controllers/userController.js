import UserModel from '../models/userModel.js';
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

      const response = await user.save();
      const userId = response.id;

      return res.status(201).json({
        success: true,
        userId,
      });
    } catch (err) {
      return next(err);
    }
  }

  // read user
  static get(req, res) {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }

  // updtate user
  static async update(req, res, next) {
    try {
      const { user } = req;
      const { name, email, cart } = req.body;

      const userData = {
        name,
        email,
        cart,
      };

      const response = await UserModel.updateOne({ _id: user.id }, userData);

      return res.status(200).json({ updated: response.acknowledged || true });
    } catch (err) {
      return next(err);
    }
  }

  // delete user
  static async delete(req, res, next) {
    const { user } = req;

    try {
      const response = await UserModel.findOneAndDelete({ _id: user.id });

      // TEMPORÁRIO
      res.cookie('token', '', {
        httpOnly: true,
        secure: !!req.headers['sec-fetch-mode'],
        sameSite: 'none',
      });

      return res.status(200).json({
        success: true,
        user: response,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default User;
