import errorHandler from '../utils/errorHandler.js';
import renderCart from './renderCart.js';

window.addEventListener('load', async () => {
  try {
    renderCart();
  } catch (err) {
    errorHandler(err);
  }
});
