const createProductDescriptionElement = (description) => {
  const productDescriptionElement = document.createElement('p');
  productDescriptionElement.classList.add('product__description');
  productDescriptionElement.textContent = description;

  return productDescriptionElement;
};

export default createProductDescriptionElement;
