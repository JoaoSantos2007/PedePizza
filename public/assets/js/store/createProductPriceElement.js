const createProductPriceElement = (price) => {
  const priceInBrl = `R$${String(price).replace('.', ',')}`;
  const productPrice = document.createElement('p');
  productPrice.classList.add('product__price');
  productPrice.textContent = priceInBrl;

  return productPrice;
};

export default createProductPriceElement;
