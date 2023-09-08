import { handleDropZoneEvents, getFile } from './dropzone.js';
import setUpdateFormMode from './setUpdateFormMode.js';
import Product from '../requests/Product.js';
import errorHandler from '../utils/errorHandler.js';
import getProductId from '../utils/getProductId.js';
import navigate from '../utils/navigate.js';

let productId = getProductId();
const isUpdateMode = !!productId;

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

    if (!isUpdateMode) {
      const data = await Product.post(product);
      productId = data.productId;
    } else {
      await Product.put(productId, product);
    }

    const file = getFile();
    if (file) {
      const formData = new FormData();
      formData.append('img', getFile());

      await Product.setProductImage(productId, formData);
    }

    navigate('/index.html');
  } catch (err) {
    errorHandler(err);
  }
});

window.addEventListener('load', () => {
  handleDropZoneEvents();

  if (productId) setUpdateFormMode(productId);
});
