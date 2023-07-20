const createProductNameElement = (name) => {
  const productName = document.createElement('p');
  productName.classList.add('product__name');
  productName.textContent = name;

  return productName;
};

export default createProductNameElement;
