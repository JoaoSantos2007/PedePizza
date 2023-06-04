import ProductModel from '../Models/ProductModel.js';

class Product {
  // add product
  static async create(req, res) {
    const data = req.body;

    const product = new ProductModel({
      name: data.name,
      type: data.type,
      description: data.description,
      price: data.price,
      img: data.img,
    });

    try {
      const response = await product.save();

      res.status(201).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // read products
  static async get(req, res) {
    const { id } = req.params;

    try {
      const response = id ? await ProductModel.findById(id) : await ProductModel.find();

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update product
  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const product = {
      name: data.name || undefined,
      type: data.type || undefined,
      description: data.description || undefined,
      price: data.price || undefined,
      img: data.img || undefined,
    };

    try {
      const response = await ProductModel.updateOne({ _id: id }, product);

      res.status(200).json({ updated: response.acknowledged || false });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // delete product
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const response = await ProductModel.deleteOne({ _id: id });

      res.status(200).json({ deleted: response.acknowledged || false });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default Product;
