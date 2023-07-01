import mongoose from 'mongoose';
import ErrorBase from '../errors/errorBase.js';
import IncorrectRequisition from '../errors/incorrectRequisition.js';
import ValidationError from '../errors/validationError.js';
import DuplicateError from '../errors/duplicateError.js';

// eslint-disable-next-line no-unused-vars
function ErrorMiddleware(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequisition().sendError(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendError(res);
  } else if (error instanceof ErrorBase) {
    error.sendError(res);
  } else if (error.code === 11000) {
    new DuplicateError(error).sendError(res);
  } else {
    new ErrorBase().sendError(res);
  }
}

export default ErrorMiddleware;
