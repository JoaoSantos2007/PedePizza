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

  // read products
  static async get(req, res) {
    const { id } = req.params;

    try {
      // Find product if id exists or find products if is no id
      const products = id ? await ProductModel.findById(id) : await ProductModel.find();

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
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

      return res.status(200).json({
        success: true,
        modifiedCount,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
        success: false,
        error,
      });
    }
  }

  // update product image
  static async setImage(req, res) {
    const { id } = req.params;
    const { img } = req; // get req img defined by Multer

    try {
      // verif if the img was sent
      if (!img) return res.status(404).json({ success: false, error: { name: 'Image Undefined', msg: 'No image was found' } });

      const response = await ProductModel.updateOne({ _id: id }, { img });
      const { modifiedCount } = response;

      return res.status(200).json({
        success: true,
        modifiedCount,
      });
    } catch (err) {
      const { error, status } = analyzeError(err);

      return res.status(status).json({
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

      // delete img if product exists
      if (response) {
        const { img } = response;
        if (img) deleteFile(img);
      }

      return res.status(200).json({
        success: true,
        deletedObject: response,
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

export default Product;
