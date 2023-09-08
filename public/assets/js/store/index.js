import createProductElement from './createProductElement.js';
import errorHandler from '../utils/errorHandler.js';
import Product from '../requests/Product.js';

window.addEventListener('load', async () => {
  try {
    const products = await Product.get();
    products.map(async (product) => {
      const productContainer = document.querySelector('#products');

      const productElement = await createProductElement(product);
      return productContainer.append(productElement);
    });
  } catch (err) {
    errorHandler(err);
  }
});
