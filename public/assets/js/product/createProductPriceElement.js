const createProductPriceElement = (price) => {
  const productPriceElement = document.createElement('p');
  productPriceElement.classList.add('product__price');
  productPriceElement.innerHTML = `Preço: <span class='product__price--value'>R$${String(price).replace('.', ',')}</span> `;

  return productPriceElement;
};

export default createProductPriceElement;
