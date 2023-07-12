import { url, api, navigate } from './utils.js';

const getProductId = () => {
  const urlString = window.location;
  const urlActual = new URL(urlString);
  const productId = urlActual.searchParams.get('id');

  return productId;
};

const loadImg = (imgName) => new Promise((resolve, reject) => {
  try {
    if (!imgName) throw new Error('Img not found!');
    const imgPath = `${url}/uploads/${imgName}`;

    fetch(imgPath).then((res) => {
      res.blob().then((file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => resolve(img);
      }).catch((err) => {
        throw err;
      }).catch((err) => {
        throw err;
      });
    });
  } catch (err) {
    reject(err);
  }
});

const defineImgWidthAndHeight = (img) => {
  const windowWidth = window.innerWidth;

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  // define ideal Width
  let idealWidth;
  if (windowWidth > 768) {
    idealWidth = windowWidth * 0.5;
  } else {
    idealWidth = windowWidth * 0.95;
  }

  // calculate ideal Height
  const idealHeight = (idealWidth * imgHeight) / imgWidth;

  return ({ idealWidth, idealHeight });
};

const createProductNameElement = (name) => {
  const productNameElement = document.createElement('h1');
  productNameElement.classList.add('productName');
  productNameElement.textContent = name;

  return productNameElement;
};

const createProductImageElement = async (img) => {
  const productImageElement = await loadImg(img);
  productImageElement.classList.add('productImage');
  productImageElement.alt = 'product image';
  const { idealWidth, idealHeight } = defineImgWidthAndHeight(productImageElement);

  productImageElement.width = idealWidth;
  productImageElement.height = idealHeight;
  return productImageElement;
};

const createProductInfoElement = () => {
  const productInfoElement = document.createElement('div');
  productInfoElement.classList.add('productInfo');

  return productInfoElement;
};

const createProductFlavorElement = (flavor) => {
  const productFlavorElement = document.createElement('p');
  productFlavorElement.classList.add('productFlavor');
  productFlavorElement.innerHTML = `Sabor: <span>${flavor}</span>`;

  return productFlavorElement;
};

const createProductIngredients = (ingredients) => {
  const productIngredientsElement = document.createElement('p');
  productIngredientsElement.classList.add('productIngredients');
  let ingredientsList = '';
  ingredients.forEach((ingredient) => {
    ingredientsList += `<br> - ${ingredient}`;
  });
  productIngredientsElement.innerHTML = `Ingredientes: <span> ${ingredientsList} </span>`;

  return productIngredientsElement;
};

const createProductPriceElement = (price) => {
  const productPriceElement = document.createElement('p');
  productPriceElement.classList.add('productPrice');
  productPriceElement.innerHTML = `Preço: <span>R$${String(price).replace('.', ',')}</span> `;

  return productPriceElement;
};

const createProductBuyButtonElement = (productId) => {
  const productBuyBtnElement = document.createElement('button');
  productBuyBtnElement.classList.add('productBuyBtn');
  productBuyBtnElement.textContent = 'Comprar';

  productBuyBtnElement.addEventListener('click', () => {
    api('/cart', 'POST', { product: productId, quantity: 1 }, () => {
      navigate('/index.html');
    });
  });

  return productBuyBtnElement;
};

const createProductDescriptionElement = (description) => {
  const productDescription = document.createElement('p');
  productDescription.classList.add('productDescription');
  productDescription.textContent = description;

  return productDescription;
};

const createProductContainerHeader = () => {
  const productContainerHeader = document.createElement('div');
  productContainerHeader.classList.add('product__container__header');

  return productContainerHeader;
};

const createProductContainerMain = () => {
  const productContainerMain = document.createElement('div');
  productContainerMain.classList.add('product__container__main');

  return productContainerMain;
};

const createProductContainerFooter = () => {
  const productContainerFooter = document.createElement('div');
  productContainerFooter.classList.add('product__container__footer');

  return productContainerFooter;
};

const renderProduct = async (product) => {
  const {
    _id, name, img, description, price, flavor, ingredients,
  } = product;
  const id = _id;
  const productContainer = document.querySelector('#productContainer');

  const productContainerHeader = createProductContainerHeader();
  const productContainerMain = createProductContainerMain();
  const productContainerFooter = createProductContainerFooter();

  const productName = createProductNameElement(name);

  const productImage = await createProductImageElement(img);
  const productInfo = createProductInfoElement();

  const productFlavor = createProductFlavorElement(flavor);
  const productIngredients = createProductIngredients(ingredients);
  const productPrice = createProductPriceElement(price);
  const productBuyBtn = createProductBuyButtonElement(id);

  const productDescription = createProductDescriptionElement(description);

  productInfo.append(productFlavor, productIngredients, productPrice, productBuyBtn);

  productContainerHeader.append(productName);
  productContainerMain.append(productImage, productInfo);
  productContainerFooter.append(productDescription);

  productContainer.append(productContainerHeader, productContainerMain, productContainerFooter);
};

window.addEventListener('load', () => {
  const productId = getProductId();

  api(`/product/${productId}`, 'GET', null, (result) => {
    renderProduct(result.product);
  });
});
