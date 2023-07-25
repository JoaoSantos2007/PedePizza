import url from '../url.js';

const addProductToCart = async (productId) => {
  // eslint-disable-next-line no-undef
  const response = axios.post(`${url}/cart`, { product: productId, quantity: 1 });
  return response;
};

export default addProductToCart;
