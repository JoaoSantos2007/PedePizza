import Product from './requests/Product.js';

const loadProductImage = (path) => new Promise((resolve) => {
  const img = new Image();

  if (path) {
    Product.getImage(path)
      .then((file) => {
        img.src = URL.createObjectURL(file);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        img.src = 'assets/img/imgNotFound.avif';
      });
  } else {
    img.src = 'assets/img/imgNotFound.avif';
  }

  img.onload = () => resolve(img);
});

export default loadProductImage;
