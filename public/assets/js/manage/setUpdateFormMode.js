import errorHandler from '../errorHandler.js';
import Product from '../requests/Product.js';
import loadProductImage from '../loadProductImage.js';
import { showImage } from './dropzone.js';

async function setUpdateFormMode(productId) {
  try {
    const product = await Product.getById(productId);
    const {
      name, flavor, ingredients, price, description, type, img,
    } = product;

    let ingredientsFormatted = '';
    ingredients.forEach((ingredient, index) => {
      if (index === ingredients.length - 1) {
        ingredientsFormatted += `${ingredient}`;
        return;
      }
      ingredientsFormatted += `${ingredient},`;
    });

    if (type === 'drink') {
      document.querySelector('.option__drink').setAttribute('selected', true);
    }

    document.querySelector('.title').textContent = 'Update Product';
    document.querySelector('#inputName').value = name;
    document.querySelector('#inputFlavor').value = flavor;
    document.querySelector('#inputIngredients').value = ingredientsFormatted;
    document.querySelector('#inputPrice').value = price;
    document.querySelector('#inputDescription').value = description;

    const image = await loadProductImage(img);
    showImage(image.src);
  } catch (err) {
    errorHandler(err);
  }
}

export default setUpdateFormMode;
