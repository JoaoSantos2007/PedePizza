import ProductModel from '../models/productModel.js';
import { deleteFile } from '../utils/uploadUtils.js';
import analyzeError from '../utils/analyzeError.js';

class Product {
  // add product
  static async create(req, res) {
    const
      {
        name, type, description, price,
      } = req.body;

    const product = new ProductModel({
      name, type, description, price, img: '',
    });

    try {
      const response = await product.save();
      const productId = response.id;

      res.status(201).json({
        success: true,
        productId,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // read products
  static async get(req, res) {
    const { id } = req.params;

    try {
      const products = id ? await ProductModel.findById(id) : await ProductModel.find();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // update product
  static async update(req, res) {
    const { id } = req.params;
    const {
      name, type, description, price,
    } = req.body;
    const product = {
      name, type, description, price,
    };

    try {
      const response = await ProductModel.updateOne({ _id: id }, product);
      const { modifiedCount } = response;

      res.status(200).json({
        success: true,
        modifiedCount,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // update product image
  static async setImage(req, res) {
    const { id } = req.params;
    const { img } = req;

    try {
      const response = await ProductModel.updateOne({ _id: id }, { img });
      const { modifiedCount } = response;

      res.status(200).json({
        success: true,
        modifiedCount,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // delete product
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const response = await ProductModel.findOneAndDelete({ _id: id });

      if (response) {
        const { img } = response;
        if (img) deleteFile(img);
      }

      res.status(200).json({
        success: true,
        deletedObject: response,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      res.status(status).json({
        success: false,
        error,
      });
    }
  }
}

export default Product;
