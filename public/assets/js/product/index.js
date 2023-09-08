import getProductId from '../utils/getProductId.js';
import createProductElement from './createProductElement.js';
import errorHandler from '../utils/errorHandler.js';
import Product from '../requests/Product.js';

window.addEventListener('load', async () => {
  try {
    const productId = getProductId();
    const product = await Product.getById(productId);

    const productElement = await createProductElement(product);

    const mainPage = document.querySelector('main');
    mainPage.append(productElement);
  } catch (err) {
    errorHandler(err);
  }
});
