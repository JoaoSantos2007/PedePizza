import navigate from '../navigate.js';
import createProductFooterElement from './createProductFooterElement.js';
import createProductHeaderElement from './createProductHeaderElement.js';
import createProductImageElement from './createProductImageElement.js';
import createProductMainElement from './createProductMainElement.js';
import createProductNameElement from './createProductNameElement.js';
import createProductPriceElement from './createProductPriceElement.js';

const createProductElement = (product) => {
  const {
    name, price, img, _id,
  } = product;
  const id = _id;

  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.addEventListener('click', () => {
    navigate(`/product.html?id=${id}`);
  });

  const productHeader = createProductHeaderElement();
  const productImage = createProductImageElement(img, name);
  const productMain = createProductMainElement();
  const productName = createProductNameElement(name);
  const productFooter = createProductFooterElement();
  const productPrice = createProductPriceElement(price);

  productHeader.append(productImage);
  productMain.append(productName);
  productFooter.append(productPrice);
  productElement.append(productHeader);
  productElement.append(productMain);
  productElement.append(productFooter);

  return productElement;
};

export default createProductElement;
