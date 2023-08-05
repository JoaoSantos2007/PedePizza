import errorHandler from '../errorHandler.js';
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

  static async post(product) {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/product', product);
    const { data } = response;

    return data;
  }

  static async setProductImage(productId, product) {
    try {
      let response = await fetch(`/product/img/${productId}`, { method: 'POST', body: product });
      response = await response.json();

      console.log(response);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  }
}

export default Product;
