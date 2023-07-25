import url from '../url.js';
import getProductId from './getProductId.js';
import createProductElement from './createProductElement.js';
import errorHandler from '../errorHandler.js';

window.addEventListener('load', async () => {
  try {
    const productId = getProductId();
    const mainPage = document.querySelector('main');

    // eslint-disable-next-line no-undef
    const response = await axios.get(`${url}/product/${productId}`);
    const { data } = response;
    const { product } = data;

    const productElement = await createProductElement(product);
    mainPage.append(productElement);
  } catch (err) {
    errorHandler(err);
  }
});
