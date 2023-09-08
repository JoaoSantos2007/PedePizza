import errorHandler from '../utils/errorHandler.js';
import '../lib/axios.js';
import url from '../utils/url.js';

class Product {
  static async get() {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/product`);
    const { data } = response;
    const { products } = data;

    return products;
  }

  static async getById(productId) {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/product/${productId}`);
    const { data } = response;
    const { product } = data;

    return product;
  }

  static async getImage(img) {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/uploads/${img}`, { responseType: 'blob' });
    const { data } = response;

    return data;
  }

  static async post(product) {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/product`, product);
    const { data } = response;

    return data;
  }

  static async put(productId, product) {
    // eslint-disable-next-line no-undef
    const response = await axios.put(`${url}/product/${productId}`, product);
    const { data } = response;

    return data;
  }

  static async setProductImage(productId, product) {
    try {
      let response = await fetch(`${url}/product/img/${productId}`, { method: 'PUT', body: product });
      response = await response.json();

      return response;
    } catch (err) {
      return errorHandler(err);
    }
  }

  static async delete(productId) {
    // eslint-disable-next-line no-undef
    const response = await axios.delete(`${url}/product/${productId}`);
    const { data } = response;

    return data;
  }
}

export default Product;
