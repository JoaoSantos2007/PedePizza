const createProductIngredientsElement = (ingredients) => {
  const productIngredientsElement = document.createElement('p');
  productIngredientsElement.classList.add('product__ingredients');
  let ingredientsList = '';
  ingredients.forEach((ingredient) => {
    ingredientsList += `<br> - ${ingredient}`;
  });
  productIngredientsElement.innerHTML = `Ingredientes: <span class='product__ingredients--value'> ${ingredientsList} </span>`;

  return productIngredientsElement;
};

export default createProductIngredientsElement;
