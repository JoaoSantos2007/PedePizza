import url from '../url.js';
import navigate from '../navigate.js';

const createProductHeaderElement = () => {
  const productHeader = document.createElement('div');
  productHeader.classList.add('product__header');

  return productHeader;
};

const createProductImageElement = (img, name) => {
  const image = `${url}/uploads/${img}`;

  const productImage = document.createElement('img');
  productImage.classList.add('product__image');
  productImage.src = image;
  productImage.alt = `${name} image`;

  return productImage;
};

const createProductMainElement = () => {
  const productMain = document.createElement('div');
  productMain.classList.add('product__main');

  return productMain;
};

const createProductNameElement = (name) => {
  const productName = document.createElement('p');
  productName.classList.add('product__name');
  productName.textContent = name;

  return productName;
};

const createProductFooterElement = () => {
  const productFooter = document.createElement('div');
  productFooter.classList.add('product__footer');

  return productFooter;
};

const createProductPriceElement = (price) => {
  const priceInBrl = `R$${String(price).replace('.', ',')}`;
  const productPrice = document.createElement('p');
  productPrice.classList.add('product__price');
  productPrice.textContent = priceInBrl;

  return productPrice;
};

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
