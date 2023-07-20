import createProductElement from './createProductElement.js';

const mountProductsElement = (products) => {
  products.map((product) => {
    const productContainer = document.querySelector('#products');

    const productElement = createProductElement(product);
    return productContainer.append(productElement);
  });
};

export default mountProductsElement;
