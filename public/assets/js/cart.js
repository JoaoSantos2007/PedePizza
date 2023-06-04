import { api, navigate, url } from './script.js';

$('document').ready(() => {
  api('/cart', 'GET', null, renderCart);
});

function renderCart(cart) {
  cart.map((product) => {
    api(`/pizza/${product.productID}`, 'GET', null, (pizza) => {
      const item = $('<li>').addClass('cart__item');

      const itemHeader = $('<div>').addClass('cart__item__header');
      const itemImg = $('<img>').addClass('cart__item__img').attr('src', url + pizza.img);
      itemHeader.append(itemImg);
      item.append(itemHeader);

      const itemMain = $('<div>').addClass('cart__item__main');
      const itemName = $('<p>').addClass('cart__item__name').text(`${pizza.nome}`);
      const itemPrice = $('<p>').addClass('cart__item__price').text(`R$${pizza.preco},00`);
      itemMain.append(itemName);
      itemMain.append(itemPrice);
      item.append(itemMain);

      const itemFooter = $('<div>').addClass('cart__item__footer');
      const itemQtde = $('<input>').addClass('cart__item__qtde').attr('type', 'number').val(product.qtde)
        .attr('max', 10)
        .attr('min', 1);
      itemQtde.change(() => {
        api(`/cart/${product.id}`, 'PUT', { qtde: itemQtde.val() }, () => {});
      });

      const itemDelete = $('<img>').addClass('cart__item__delete').attr('src', 'assets/icon/delete.svg').attr('alt', 'drop item');
      itemDelete.click(() => {
        api(`/cart/${product.id}`, 'DELETE', '', () => {
          navigate('/cart.html');
        });
      });

      itemFooter.append(itemQtde);
      itemFooter.append(itemDelete);
      item.append(itemFooter);

      $('.cart__content').append(item);
    });
  });
}
