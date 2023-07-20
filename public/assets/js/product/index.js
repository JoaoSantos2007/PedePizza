import url from '../url.js';
import getProductId from './getProductId.js';
import mountProductElement from './mountProductElement.js';

window.addEventListener('load', async () => {
  try {
    const productId = getProductId();
    const productElement = document.querySelector('#product');

    const response = await axios.get(`${url}/product/${productId}`);
    const { data } = response;
    const { product } = data;

    await mountProductElement(product, productElement);
  } catch (err) {
    console.error(err);
  }
});
