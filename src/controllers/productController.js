import IncorrectRequisition from '../errors/incorrectRequisition.js';
import NotFoundError from '../errors/notFoundError.js';
import ProductModel from '../models/productModel.js';
import { deleteFile } from '../utils/uploadUtils.js';

class Product {
  // add product
  static async create(req, res, next) {
    try {
      const
        {
          name, type, description, price, flavor, ingredients,
        } = req.body;

      const product = new ProductModel({
        name, type, flavor, ingredients, description, price, img: '',
      });

      const response = await product.save();
      const productId = response.id;

      return res.status(201).json({
        success: true,
        productId,
      });
    } catch (err) {
      return next(err);
    }
  }

  // read products
  static async get(req, res, next) {
    try {
      const products = await ProductModel.find();

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (err) {
      return next(err);
    }
  }

  // read product by a Id
  static async getByID(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (product === null) {
        return next(new NotFoundError('Product Id not found!'));
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return next(err);
    }
  }

  // update product
  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const {
        name, type, description, price, flavor, ingredients,
      } = req.body;

      const data = {
        name, type, description, price, flavor, ingredients,
      };

      const product = await ProductModel.findByIdAndUpdate(id, data);

      if (product === null) {
        return next(new NotFoundError('Product Id not found!'));
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return next(err);
    }
  }

  // update product image
  static async updateImg(req, res, next) {
    try {
      const { img, product } = req;
      if (!img) return next(new IncorrectRequisition('Image field is empty'));

      product.set('img', img);
      await product.validate();
      await product.save();

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return next(err);
    }
  }

  // delete product
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByIdAndRemove(id);

      if (product === null) {
        next(new NotFoundError('Product Id not found!'));
      }

      const { img } = product;
      if (img) deleteFile(img);

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default Product;
