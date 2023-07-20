const createProductNameElement = (name) => {
  const productNameElement = document.createElement('h1');
  productNameElement.classList.add('product__name');
  productNameElement.textContent = name;

  return productNameElement;
};

export default createProductNameElement;
