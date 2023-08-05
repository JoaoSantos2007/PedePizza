const getFormType = () => {
  const urlString = window.location;
  const urlActual = new URL(urlString);
  const productId = urlActual.searchParams.get('type');

  return productId;
};

export default getFormType;
