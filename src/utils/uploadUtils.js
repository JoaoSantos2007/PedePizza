import fs from 'fs';
import Product from '../models/productModel.js';
import { UPLOAD_PATH as uploadPath } from './env.js';

const deleteOldFiles = async () => {
  const Products = await Product.find();
  const files = fs.readdirSync(uploadPath);
  const imagesPath = [];

  Products.forEach((product) => {
    imagesPath.push(product.img);
  });

  files.forEach((file) => {
    if (!imagesPath.includes(file)) {
      fs.rmSync(`${uploadPath}/${file}`);
    }
  });
};

const deleteFile = async (file) => {
  fs.rmSync(`${uploadPath}/${file}`);
};

export { deleteOldFiles, deleteFile };
