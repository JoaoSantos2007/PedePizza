const createProductBuyButtonElement = (productId) => {
  const productBuyBtnElement = document.createElement('button');
  productBuyBtnElement.classList.add('product__buy-btn');
  productBuyBtnElement.textContent = 'Comprar';

  productBuyBtnElement.addEventListener('click', () => {
    api('/cart', 'POST', { product: productId, quantity: 1 }, () => {
      navigate('/index.html');
    });
  });

  return productBuyBtnElement;
};

export default createProductBuyButtonElement;
