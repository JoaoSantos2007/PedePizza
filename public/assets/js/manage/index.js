import { handleDropZoneEvents, getFile } from './dropzone.js';
// import { verifyUpdatePizzaMode } from './update-pizza.js';

import Product from '../requests/Product.js';
import errorHandler from '../errorHandler.js';

const productForm = document.querySelector('#productForm');
productForm.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const product = {
      name: document.querySelector('#inputName').value,
      flavor: document.querySelector('#inputFlavor').value,
      ingredients: document.querySelector('#inputIngredients').value.split(','),
      price: Number(document.querySelector('#inputPrice').value),
      description: document.querySelector('#inputDescription').value,
      type: document.querySelector('#inputType').options[document.querySelector('#inputType').selectedIndex].value,
    };

    const data = await Product.post(product);
    const { productId } = data;

    const formData = new FormData();
    formData.append('img', getFile());

    Product.setProductImage(productId, formData);

    // createPizza(formData);
  } catch (err) {
    errorHandler(err);
  }
});

window.addEventListener('load', () => {
  // verifyUpdatePizzaMode();
  handleDropZoneEvents();
});
