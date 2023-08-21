import '../lib/axios.js';
import url from '../url.js';

class Cart {
  static async get() {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/cart`);
    const { data } = response;
    const { cart } = data;

    return cart;
  }

  static async post(productId) {
    // eslint-disable-next-line no-undef
    const response = await axios.post(`${url}/cart`, { product: productId, quantity: 1 });
    const { data } = response;

    return data;
  }

  static async put(recordId, quantity) {
    // eslint-disable-next-line no-undef
    const response = await axios.put(`${url}/cart/${recordId}`, { quantity });
    const { data } = response;

    return data;
  }

  static async delete(recordId) {
    // eslint-disable-next-line no-undef
    const response = await axios.delete(`${url}/cart/${recordId}`);
    const { data } = response;

    return data;
  }
}

export default Cart;
