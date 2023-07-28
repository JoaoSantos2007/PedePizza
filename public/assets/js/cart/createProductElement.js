import errorHandler from '../errorHandler.js';
import Cart from '../requests/Cart.js';
import url from '../url.js';

const createProductHeaderElement = () => {
  const productHeader = document.createElement('div');
  productHeader.classList.add('record__header');

  return productHeader;
};

const createProductMainElement = () => {
  const productMain = document.createElement('div');
  productMain.classList.add('record__main');

  return productMain;
};

const createProductFooterElement = () => {
  const productFooter = document.createElement('div');
  productFooter.classList.add('record__footer');

  return productFooter;
};

const createProductImageElement = (img) => {
  const productImage = document.createElement('img');
  productImage.classList.add('record__image');
  productImage.src = `${url}/uploads/${img}`;

  return productImage;
};

const createProductNameElement = (name) => {
  const productName = document.createElement('p');
  productName.classList.add('record__name');
  productName.textContent = name;

  return productName;
};

const calculateTotalPrice = (price, quantity) => {
  const totalPrice = (price * quantity).toFixed(2);
  const priceBRL = String(totalPrice).replace('.', ',');

  return priceBRL;
};

const createProductPriceElement = (price, recordId) => {
  const productPrice = document.createElement('p');
  productPrice.id = `priceValue-${recordId}`;
  productPrice.classList.add('record__price');
  productPrice.textContent = `R$${price}`;

  return productPrice;
};

const createProductQuantityElement = (quantity, recordId, price) => {
  const productQuantity = document.createElement('input');
  productQuantity.classList.add('record__quantity');
  productQuantity.type = 'number';
  productQuantity.value = quantity;
  productQuantity.max = 10;
  productQuantity.min = 1;

  productQuantity.addEventListener('change', async () => {
    try {
      await Cart.put(recordId, productQuantity.value);

      const productPriceElement = document.querySelector(`#priceValue-${recordId}`);
      const priceBRL = calculateTotalPrice(price, productQuantity.value);
      productPriceElement.textContent = `R$${priceBRL}`;
    } catch (err) {
      errorHandler(err);
    }
  });

  return productQuantity;
};

const createProductDelete = (recordId) => {
  const productDelete = document.createElement('img');
  productDelete.classList.add('record__delete');
  productDelete.src = 'assets/img/delete.svg';
  productDelete.alt = 'drop product from cart';

  productDelete.addEventListener('click', async () => {
    try {
      await Cart.delete(recordId);
      window.location.reload();
    } catch (err) {
      errorHandler(err);
    }
  });

  return productDelete;
};

const createProductElement = (record) => {
  const { product, quantity } = record;
  const {
    img, name, price,
  } = product;
  // eslint-disable-next-line no-underscore-dangle
  const recordId = record._id;
  const priceBRL = calculateTotalPrice(price, quantity);

  const productElement = document.createElement('li');
  productElement.classList.add('record');

  const productHeader = createProductHeaderElement();
  const productMain = createProductMainElement();
  const productFooter = createProductFooterElement();

  const productImage = createProductImageElement(img);
  const productName = createProductNameElement(name);
  const productPrice = createProductPriceElement(priceBRL, recordId);
  const productQuantity = createProductQuantityElement(quantity, recordId, price);
  const productDelete = createProductDelete(recordId);

  productHeader.append(productImage);
  productMain.append(productName, productPrice);
  productFooter.append(productQuantity, productDelete);

  productElement.append(productHeader, productMain, productFooter);

  return productElement;
};

export default createProductElement;
