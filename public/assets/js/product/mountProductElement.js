import createProductHeaderElement from './createProductHeaderElement.js';
import createProductMainElement from './createProductMainElement.js';
import createProductFooterElement from './createProductFooterElement.js';
import createProductNameElement from './createProductNameElement.js';
import createProductImageElement from './createProductImageElement.js';
import createProductInfoElement from './createProductInfoElement.js';
import createProductFlavorElement from './createProductFlavorElement.js';
import createProductIngredients from './createProductIngredientsElement.js';
import createProductPriceElement from './createProductPriceElement.js';
import createProductDescriptionElement from './createProductDescriptionElement.js';
import createProductBuyButtonElement from './createProductBuyButtonElement.js';

const mountProductElement = async (product, productElement) => {
  const {
    _id, name, img, description, price, flavor, ingredients,
  } = product;
  const id = _id;

  const productHeader = createProductHeaderElement();
  const productMain = createProductMainElement();
  const productFooter = createProductFooterElement();

  const productName = createProductNameElement(name);

  const productImage = await createProductImageElement(img);
  const productInfo = createProductInfoElement();

  const productFlavor = createProductFlavorElement(flavor);
  const productIngredients = createProductIngredients(ingredients);
  const productPrice = createProductPriceElement(price);
  const productBuyBtn = createProductBuyButtonElement(id);

  const productDescription = createProductDescriptionElement(description);

  productInfo.append(productFlavor, productIngredients, productPrice, productBuyBtn);

  productHeader.append(productName);
  productMain.append(productImage, productInfo);
  productFooter.append(productDescription);

  productElement.append(productHeader, productMain, productFooter);
};

export default mountProductElement;
