import UserModel from '../models/userModel.js';
import analyzeError from '../utils/analyzeError.js';
import { hashPassword } from '../utils/userUtils.js';

class User {
  // create user
  static async create(req, res) {
    const { name, email, password } = req.body;

    const user = new UserModel({
      name,
      email,
      hashPassword: hashPassword(password),
      admin: false,
      cart: {},
    });

    try {
      const response = await user.save();
      const productId = response.id;

      return res.status(201).json({
        success: true,
        productId,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
        success: false,
        error,
      });
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
  static async update(req, res) {
    const { user } = req;
    const { name, email, cart } = req.body;

    const userData = {
      name,
      email,
      cart,
    };

    try {
      const response = await UserModel.updateOne({ _id: user.id }, userData);

      return res.status(200).json({ updated: response.acknowledged || true });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // delete user
  static async delete(req, res) {
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
        deletedUser: response,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
        success: false,
        error,
      });
    }
  }
}

export default User;
