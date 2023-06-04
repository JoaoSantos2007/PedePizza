import { url, api, navigate } from './script.js';

$('document').ready(() => {
  const pizzaID = sessionStorage.getItem('pizzaID');
  if (!pizzaID) return;

  api(`/pizza/${pizzaID}`, 'GET', null, (pizza) => {
    renderPizza(pizza);

    $('#addToCart').click(() => addToCart(pizzaID));
  });
});

function renderPizza(pizza) {
  $('#pizzaName').text(pizza.nome);
  $('#pizzaIMG').attr('src', url + pizza.img);
  $('#pizzaDescricao').text(pizza.descricao);
  $('#pizzaPreco').text(`${pizza.preco},00`);
}

function addToCart(pizzaID) {
  api('/cart', 'POST', { productID: pizzaID }, () => {
    navigate('/index.html');
  });
}
