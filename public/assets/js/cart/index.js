import errorHandler from '../errorHandler.js';
import renderCart from './renderCart.js';

window.addEventListener('load', async () => {
  try {
    renderCart();
  } catch (err) {
    errorHandler(err);
  }
});

const quantityChanged = (value, id) => {
  console.log('ok');
};
