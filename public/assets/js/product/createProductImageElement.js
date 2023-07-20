import defineImgSize from './defineImgSize.js';
import loadImg from './loadImage.js';

const createProductImageElement = async (img) => {
  const productImageElement = await loadImg(img);
  productImageElement.classList.add('product__image');
  productImageElement.alt = 'product image';
  const { idealWidth, idealHeight } = defineImgSize(productImageElement);

  productImageElement.width = idealWidth;
  productImageElement.height = idealHeight;
  return productImageElement;
};

export default createProductImageElement;
