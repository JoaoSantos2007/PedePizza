import createProductElement from './createProductElement.js';
import errorHandler from '../errorHandler.js';
import Product from '../requests/Product.js';

window.addEventListener('load', async () => {
  try {
    const products = await Product.get();
    products.map((product) => {
      const productContainer = document.querySelector('#products');

      const productElement = createProductElement(product);
      return productContainer.append(productElement);
    });
  } catch (err) {
    errorHandler(err);
  }
});
