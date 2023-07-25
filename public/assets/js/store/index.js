import url from '../url.js';
import createProductElement from './createProductElement.js';
import errorHandler from '../errorHandler.js';

window.addEventListener('load', async () => {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/product`);
    const { data } = response;
    const { products } = data;

    products.map((product) => {
      const productContainer = document.querySelector('#products');

      const productElement = createProductElement(product);
      return productContainer.append(productElement);
    });
  } catch (err) {
    errorHandler(err);
  }
});
