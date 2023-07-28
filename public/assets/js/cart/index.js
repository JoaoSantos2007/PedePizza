import errorHandler from '../errorHandler.js';
import createProductElement from './createProductElement.js';
import Cart from '../requests/Cart.js';

window.addEventListener('load', async () => {
  try {
    const cart = await Cart.get();
    const cartList = document.querySelector('#cartList');

    cart.map((record) => {
      const productElement = createProductElement(record);
      return cartList.append(productElement);
    });
  } catch (err) {
    errorHandler(err);
  }
});
