import '../lib/axios.js';

class Product {
  static async get() {
    // eslint-disable-next-line no-undef
    const response = await axios.get('/product');
    const { data } = response;
    const { products } = data;

    return products;
  }

  static async getById(productId) {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`/product/${productId}`);
    const { data } = response;
    const { product } = data;

    return product;
  }
}

export default Product;
