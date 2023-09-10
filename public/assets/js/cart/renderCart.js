/* eslint-disable no-underscore-dangle */
import errorHandler from '../utils/errorHandler.js';
import Cart from '../requests/Cart.js';
import url from '../utils/url.js';

let records = [];

const createImageElement = (image) => {
  const imageElement = document.createElement('img');
  imageElement.classList.add('record__image');
  imageElement.alt = 'Product Image';
  imageElement.src = `${url}/uploads/${image}`;

  return imageElement;
};

const createRecordNameElement = (name) => {
  const recordNameElement = document.createElement('p');
  recordNameElement.classList.add('record__name');
  recordNameElement.textContent = name;

  return recordNameElement;
};

const createRecordFlavorElement = (flavor) => {
  const recordFlavorElement = document.createElement('p');
  recordFlavorElement.classList.add('record__flavor');
  recordFlavorElement.textContent = flavor;

  return recordFlavorElement;
};

const calculatePriceInBrl = (price, quantity) => `R$${(price * quantity).toFixed(2)}`.replace('.', ',');

const createRecordPriceElement = (price, quantity, recordId) => {
  const priceBRL = calculatePriceInBrl(price, quantity);
  const recordPriceElement = document.createElement('p');
  recordPriceElement.classList.add('record__price');
  recordPriceElement.id = `price-${recordId}`;
  recordPriceElement.textContent = priceBRL;

  return recordPriceElement;
};

const createRecordInfoElement = ({ name, flavor, price }, { quantity, _id: recordId }) => {
  const recordInfoElement = document.createElement('div');
  recordInfoElement.classList.add('record__info');

  const recordNameElement = createRecordNameElement(name);
  const recordFlavorElement = createRecordFlavorElement(flavor);
  const recordPriceElement = createRecordPriceElement(price, quantity, recordId);

  recordInfoElement.append(recordNameElement, recordFlavorElement, recordPriceElement);

  return recordInfoElement;
};

const createInputSpinnerElement = (recordId, quantity) => {
  const inputSpinnerElement = document.createElement('section');
  inputSpinnerElement.classList.add('input-spinner');

  const minusBtn = document.createElement('button');
  minusBtn.classList.add('input-spinner__button');
  const minusIcon = document.createElement('img');
  minusIcon.src = `${url}/assets/img/dash.svg`;
  minusBtn.id = `minus-${recordId}`;
  minusBtn.append(minusIcon);

  const inputNumber = document.createElement('input');
  inputNumber.classList.add('input-spinner__number');
  inputNumber.type = 'number';
  inputNumber.setAttribute('value', quantity);
  inputNumber.min = '0';
  inputNumber.max = '10';
  inputNumber.id = `inputspinner-${recordId}`;
  inputNumber.disabled = true;

  const plusBtn = document.createElement('button');
  plusBtn.classList.add('input-spinner__button');
  const plusIcon = document.createElement('img');
  plusIcon.src = `${url}/assets/img/plus.svg`;
  plusBtn.append(plusIcon);
  plusBtn.id = `plus-${recordId}`;

  inputSpinnerElement.append(minusBtn, inputNumber, plusBtn);

  return inputSpinnerElement;
};

const createRecordDeleteElement = (recordId) => {
  const recordDeleteElement = document.createElement('p');
  recordDeleteElement.classList.add('record__delete');
  recordDeleteElement.textContent = 'Excluir';

  recordDeleteElement.addEventListener('click', async () => {
    try {
      await Cart.delete(recordId);
      // eslint-disable-next-line no-use-before-define
      renderCart();
    } catch (err) {
      errorHandler(err);
    }
  });

  return recordDeleteElement;
};

const createRecordActionElement = ({ _id, quantity }) => {
  const recordActionElement = document.createElement('div');
  recordActionElement.classList.add('record__action');

  const inputSpinnerElement = createInputSpinnerElement(_id, quantity);
  const recordDeleteElement = createRecordDeleteElement(_id);

  recordActionElement.append(inputSpinnerElement);
  recordActionElement.innerHTML += '<hr size="32" style="margin: 0px 8px;"></hr>';
  recordActionElement.append(recordDeleteElement);

  return recordActionElement;
};

const createRecordMainElement = (product, record) => {
  const recordMainElement = document.createElement('div');
  recordMainElement.classList.add('record__main');

  const recordInfoElement = createRecordInfoElement(product, record);
  const recordActionElement = createRecordActionElement(record);

  recordMainElement.append(recordInfoElement, recordActionElement);

  return recordMainElement;
};

const createRecordElement = (record) => {
  const recordElement = document.createElement('div');
  recordElement.classList.add('record');
  const { product } = record;

  const imageElement = createImageElement(product.img);

  // eslint-disable-next-line no-underscore-dangle
  const mainElement = createRecordMainElement(product, record);

  recordElement.append(imageElement, mainElement);

  return recordElement;
};

const calculateSubTotal = () => {
  let price = 0;
  let itens = 0;
  const values = Object.values(records);
  const itensElement = document.querySelector('#itens');
  const subtotalElement = document.querySelector('#subtotal');

  values.forEach((record) => {
    price += record.product.price * record.quantity;
    itens += record.quantity;
  });

  itensElement.textContent = itens;
  subtotalElement.textContent = calculatePriceInBrl(price, 1);
};

const handleInputSpinnerClickEvent = ({ _id: recordId, product }) => {
  const minusBtn = document.querySelector(`#minus-${recordId}`);
  const plusBtn = document.querySelector(`#plus-${recordId}`);
  const inputSpinner = document.querySelector(`#inputspinner-${recordId}`);
  const priceElement = document.querySelector(`#price-${recordId}`);

  minusBtn.addEventListener('click', async () => {
    try {
      const quantity = Number(inputSpinner.value) - 1;
      if (quantity >= 1) {
        inputSpinner.value = quantity;
        priceElement.textContent = calculatePriceInBrl(product.price, quantity);
        records[recordId].quantity = quantity;
        calculateSubTotal();
        await Cart.put(recordId, quantity);
      }
    } catch (err) {
      errorHandler(err);
    }
  });

  plusBtn.addEventListener('click', async () => {
    try {
      const quantity = Number(inputSpinner.value) + 1;
      if (quantity <= 10) {
        inputSpinner.value = quantity;
        priceElement.textContent = calculatePriceInBrl(product.price, quantity);
        records[recordId].quantity = quantity;
        calculateSubTotal();
        await Cart.put(recordId, quantity);
      }
    } catch (err) {
      errorHandler(err);
    }
  });
};

const renderCart = async () => {
  try {
    const cart = await Cart.get();
    records = {};
    const cartList = document.querySelector('#records');
    cartList.innerHTML = '';

    cart.map((record) => {
      const productElement = createRecordElement(record);
      cartList.append(productElement);
      handleInputSpinnerClickEvent(record);
      records[record._id] = record;

      return true;
    });

    calculateSubTotal();
  } catch (err) {
    errorHandler(err);
  }
};

export default renderCart;
