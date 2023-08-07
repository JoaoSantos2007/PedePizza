const getProductId = () => {
  const urlString = window.location;
  const urlActual = new URL(urlString);
  const productId = urlActual.searchParams.get('id');

  return productId;
};

export default getProductId;
