import spawnError from '../spawnError.js';
import url from '../url.js';
import mountProductsElement from './mountProductsElement.js';

window.addEventListener('load', async () => {
  try {
    const response = await axios.get(`${url}/product`);
    const { data } = response;
    const { products } = data;

    mountProductsElement(products);
  } catch (err) {
    spawnError(err);
  }
});
