import url from '../url.js';

const createProductImageElement = (img, name) => {
  const image = `${url}/uploads/${img}`;

  const productImage = document.createElement('img');
  productImage.classList.add('product__image');
  productImage.src = image;
  productImage.alt = `${name} image`;

  return productImage;
};

export default createProductImageElement;
