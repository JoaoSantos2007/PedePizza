import { api } from './script.js';

function verifyUpdatePizzaMode() {
  const updatePizzaID = sessionStorage.getItem('updatePizzaID');

  if (!updatePizzaID) return;

  sessionStorage.removeItem('updatePizzaID');

  api(`/pizza/${updatePizzaID}`, 'GET', null, (pizza) => {
    setPizzaUpdateMode(pizza);
  });
}

function setPizzaUpdateMode(pizza) {
  $('header__title').val('Update Pizza');

  $('#inputName').val(pizza.nome);
  $('#inputPreco').val(pizza.preco);
  $('#inputFile').val(pizza.img);
}

export { verifyUpdatePizzaMode };
