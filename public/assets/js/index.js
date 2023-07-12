import { navigate, api, url } from './utils.js';

const createItemElement = (id) => {
  const item = document.createElement('div');
  item.classList.add('item');

  item.addEventListener('click', () => {
    navigate(`/product.html?id=${id}`);
  });

  return item;
};

const createItemHeaderElement = () => {
  const itemHeader = document.createElement('div');
  itemHeader.classList.add('item__header');

  return itemHeader;
};

const createItemImageElement = (img, name) => {
  const image = `${url}/uploads/${img}`;

  const itemImage = document.createElement('img');
  itemImage.classList.add('item__img');
  itemImage.src = image;
  itemImage.alt = `${name} image`;

  return itemImage;
};

const createItemMainElement = () => {
  const itemMain = document.createElement('div');
  itemMain.classList.add('item__main');

  return itemMain;
};

const createItemNameElement = (name) => {
  const itemName = document.createElement('p');
  itemName.classList.add('item__name');
  itemName.textContent = name;

  return itemName;
};

const createItemFooterElement = () => {
  const itemFooter = document.createElement('div');
  itemFooter.classList.add('item__footer');

  return itemFooter;
};

const createItemPriceElement = (price) => {
  const priceInBrl = `R$${String(price).replace('.', ',')}`;
  const itemPrice = document.createElement('p');
  itemPrice.classList.add('item__price');
  itemPrice.textContent = priceInBrl;

  return itemPrice;
};

const renderProducts = (products) => {
  if (!products) return;

  products.map((product) => {
    const {
      name, price, img,
    } = product;
    const { _id } = product;
    const id = _id;
    const productContainer = document.querySelector('#productContainer');

    const item = createItemElement(id);
    const itemHeader = createItemHeaderElement();
    const itemImage = createItemImageElement(img, name);
    const itemMain = createItemMainElement();
    const itemName = createItemNameElement(name);

    const itemFooter = createItemFooterElement();
    const itemPrice = createItemPriceElement(price);

    itemHeader.append(itemImage);
    itemMain.append(itemName);
    itemFooter.append(itemPrice);
    item.append(itemHeader);
    item.append(itemMain);
    item.append(itemFooter);

    return productContainer.append(item);
  });
};

window.addEventListener('load', () => {
  api('/product', 'GET', null, (res) => {
    renderProducts(res.products);
  });
});
