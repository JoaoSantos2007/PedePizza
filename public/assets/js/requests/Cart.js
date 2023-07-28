import '../lib/axios.js';

class Cart {
  static async get() {
    // eslint-disable-next-line no-undef
    const response = await axios.get('/cart');
    const { data } = response;
    const { cart } = data;

    return cart;
  }

  static async post(productId) {
    // eslint-disable-next-line no-undef
    const response = await axios.post('/cart', { product: productId, quantity: 1 });
    const { data } = response;

    return data;
  }

  static async put(recordId, quantity) {
    // eslint-disable-next-line no-undef
    const response = await axios.put(`/cart/${recordId}`, { quantity });
    const { data } = response;

    return data;
  }

  static async delete(recordId) {
    // eslint-disable-next-line no-undef
    const response = await axios.delete(`/cart/${recordId}`);
    const { data } = response;

    return data;
  }
}

export default Cart;
