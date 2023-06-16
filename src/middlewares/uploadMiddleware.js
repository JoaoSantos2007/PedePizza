import multer from 'multer';
import path from 'path';
import randomID from '../utils/randomID.js';
import { UPLOAD_PATH as uploadPath } from '../utils/env.js';
import Product from '../models/productModel.js';
import analyzeError from '../utils/analyzeError.js';

class UploadMiddleware {
  static async verifyProduct(req, res, next) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) return res.status(404).json({ success: false, error: { name: 'Product not found', msg: 'No product was found for the req params id' } });
      return next();
    } catch (err) {
      analyzeError(err);
      const { error, status } = analyzeError(err);

      return res.status(status).json({
        success: false,
        error,
      });
    }
  }

  static upload = multer({
    storage: multer.diskStorage({
      destination: uploadPath,
      filename(req, file, callback) {
        const ext = path.extname(file.originalname);
        const imgID = randomID();
        const fileName = `${imgID}${ext}`;

        req.img = `${fileName}`;
        return callback(null, fileName);
      },
    }),
  });
}

export default UploadMiddleware;
