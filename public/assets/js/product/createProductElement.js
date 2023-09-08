import defineImgSize from './defineImgSize.js';
import loadProductImage from '../utils/loadProductImage.js';
import navigate from '../utils/navigate.js';
import errorHandler from '../utils/errorHandler.js';
import Cart from '../requests/Cart.js';
import Product from '../requests/Product.js';
import url from '../utils/url.js';
import verifyAdmin from '../utils/verifyAdmin.js';

const createProductHeaderElement = () => {
  const productHeaderElement = document.createElement('div');
  productHeaderElement.classList.add('product__header');

  return productHeaderElement;
};

const createProductMainElement = () => {
  const productMainElement = document.createElement('div');
  productMainElement.classList.add('product__main');

  return productMainElement;
};

const createProductFooterElement = () => {
  const productFooterElement = document.createElement('div');
  productFooterElement.classList.add('product__footer');

  return productFooterElement;
};

const createProductNameElement = (name) => {
  const productNameElement = document.createElement('h1');
  productNameElement.classList.add('product__name');
  productNameElement.textContent = name;

  return productNameElement;
};

const createProductImageElement = async (img) => {
  const productImageElement = await loadProductImage(img);
  productImageElement.classList.add('product__image');
  productImageElement.alt = 'product image';
  const { idealWidth, idealHeight } = defineImgSize(productImageElement);

  productImageElement.width = idealWidth;
  productImageElement.height = idealHeight;
  return productImageElement;
};

const createProductInfoElement = () => {
  const productInfoElement = document.createElement('div');
  productInfoElement.classList.add('product__info');

  return productInfoElement;
};

const createProductFlavorElement = (flavor) => {
  const productFlavorElement = document.createElement('p');
  productFlavorElement.classList.add('product__flavor');
  productFlavorElement.innerHTML = `Sabor: <span class='product__flavor--value'>${flavor}</span>`;

  return productFlavorElement;
};

const createProductIngredientsElement = (ingredients) => {
  const productIngredientsElement = document.createElement('p');
  productIngredientsElement.classList.add('product__ingredients');
  let ingredientsList = '';
  ingredients.forEach((ingredient) => {
    ingredientsList += `<br> - ${ingredient}`;
  });
  productIngredientsElement.innerHTML = `Ingredientes: <span class='product__ingredients--value'> ${ingredientsList} </span>`;

  return productIngredientsElement;
};

const createProductPriceElement = (price) => {
  const productPriceElement = document.createElement('p');
  productPriceElement.classList.add('product__price');
  productPriceElement.innerHTML = `Preço: <span class='product__price--value'>R$${String(price).replace('.', ',')}</span> `;

  return productPriceElement;
};

const createProductBuyButtonElement = (productId) => {
  const productBuyBtnElement = document.createElement('button');
  productBuyBtnElement.classList.add('product__buy-btn');
  productBuyBtnElement.textContent = 'Comprar';

  productBuyBtnElement.addEventListener('click', async () => {
    try {
      await Cart.post(productId);
      navigate('/index.html');
    } catch (err) {
      errorHandler(err);
    }
  });

  return productBuyBtnElement;
};

const createProductDescriptionElement = (description) => {
  const productDescriptionElement = document.createElement('p');
  productDescriptionElement.classList.add('product__description');
  productDescriptionElement.textContent = description;

  return productDescriptionElement;
};

const createProductControlElement = (productId) => {
  const productControlElement = document.createElement('div');
  productControlElement.classList.add('product__control');

  const editProductElement = document.createElement('img');
  editProductElement.classList.add('product__action');
  editProductElement.src = `${url}/assets/img/pencil.svg`;
  editProductElement.alt = 'edit button';
  editProductElement.addEventListener('click', () => {
    navigate(`/manage.html?id=${productId}`);
  });

  const deleteProductElement = document.createElement('img');
  deleteProductElement.classList.add('product__action');
  deleteProductElement.src = `${url}/assets/img/trash.svg`;
  deleteProductElement.alt = 'delete button';
  deleteProductElement.addEventListener('click', async () => {
    try {
      await Product.delete(productId);
      navigate('/index.html');
    } catch (err) {
      errorHandler(err);
    }
  });

  productControlElement.append(editProductElement, deleteProductElement);

  return productControlElement;
};

const createProductElement = async (product) => {
  const {
    _id, name, img, description, price, flavor, ingredients,
  } = product;
  const id = _id;

  const productElement = document.createElement('section');
  productElement.classList.add('product');

  const productHeader = createProductHeaderElement();
  const productMain = createProductMainElement();
  const productFooter = createProductFooterElement();
  const productName = createProductNameElement(name);
  const productImage = await createProductImageElement(img);
  const productInfo = createProductInfoElement();
  const productFlavor = createProductFlavorElement(flavor);
  const productIngredients = createProductIngredientsElement(ingredients);
  const productPrice = createProductPriceElement(price);
  const productBuyBtn = createProductBuyButtonElement(id);
  const productDescription = createProductDescriptionElement(description);
  const productControl = await verifyAdmin() ? createProductControlElement(id) : '';

  productInfo.append(productFlavor, productIngredients, productPrice, productBuyBtn);
  productHeader.append(productName);
  productMain.append(productImage, productInfo);
  productFooter.append(productDescription);
  productElement.append(productHeader, productMain, productFooter, productControl);

  return productElement;
};

export default createProductElement;
