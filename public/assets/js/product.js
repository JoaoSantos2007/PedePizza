import { url, api, navigate } from './utils.js';

const getProductId = () => {
  const urlString = window.location;
  const urlActual = new URL(urlString);
  const productId = urlActual.searchParams.get('id');

  return productId;
};

const createItemNameElement = (name) => {
  const itemName = document.createElement('h1');
  itemName.classList.add('header__title');
  itemName.textContent = name;

  return itemName;
};

const createItemImageELement = (img) => {
  const itemImage = document.createElement('img');
  itemImage.classList.add('pizzaIMG');
  itemImage.src = `${url}/uploads/${img}`;
  itemImage.alt = `${img} product image`;

  return itemImage;
};

const createItemDescriptionElement = (description) => {
  const itemDescription = document.createElement('p');
  itemDescription.classList.add('pizzaDescricao');
  itemDescription.textContent = description;

  return itemDescription;
};

const createItemPriceElement = (price) => {
  const itemPrice = document.createElement('p');
  itemPrice.classList.add('pizzaPreco');
  itemPrice.textContent = `R$${price}`;

  return itemPrice;
};

const createItemButtonElement = (productId) => {
  const itemBtn = document.createElement('button');
  itemBtn.classList.add('addToCart');
  itemBtn.value = 'ADICIONAR AO CARRINHO';

  itemBtn.addEventListener('click', () => {
  // api('/cart', 'POST', { productID: pizzaID }, () => {
  //   navigate('/index.html');
  // });

    navigate('/index.html');
  });

  return itemBtn;
};

const renderProduct = (product) => {
  const {
    name, img, description, price,
  } = product;
  const itemContainer = document.querySelector('#itemContainer');

  const itemName = createItemNameElement(name);
  const itemImage = createItemImageELement(img);
  const itemDescription = createItemDescriptionElement(description);
  const itemPrice = createItemPriceElement(price);
  const itemBtn = createItemButtonElement();

  // itemContainer.append(itemName, itemImage, itemDescription, itemPrice, itemBtn);
};

window.addEventListener('load', () => {
  const productId = getProductId();

  console.log(productId);
  api(`/product/${productId}`, 'GET', null, (response) => {
    console.log(response);
    renderProduct(response.products);
  });
});
