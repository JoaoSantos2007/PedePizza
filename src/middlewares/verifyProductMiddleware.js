import NotFoundError from '../errors/notFoundError.js';
import Product from '../models/productModel.js';
import ErrorMiddleware from './errorMiddleware.js';

async function VerifProductMiddleware(req, res, next) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product === null) {
      const notFoundError = new NotFoundError('Product Id not found!');
      return notFoundError.sendError(res);
    }

    req.product = product;
    next();
  } catch (err) {
    return ErrorMiddleware(err, req, res, next);
  }
}

export default VerifProductMiddleware;
