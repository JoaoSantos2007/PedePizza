import NotFoundError from '../errors/notFoundError.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';

async function VerifProductMiddleware(req, res, next) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product === null) throw new NotFoundError('Product Id not found!');

    req.product = product;
    next();
  } catch (err) {
    return ErrorHandler(err, res);
  }
}

export default VerifProductMiddleware;
