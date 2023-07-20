const createProductFlavorElement = (flavor) => {
  const productFlavorElement = document.createElement('p');
  productFlavorElement.classList.add('product__flavor');
  productFlavorElement.innerHTML = `Sabor: <span class='product__flavor--value'>${flavor}</span>`;

  return productFlavorElement;
};

export default createProductFlavorElement;
