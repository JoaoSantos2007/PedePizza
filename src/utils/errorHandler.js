import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import ErrorBase from '../errors/errorBase.js';
import IncorrectRequisition from '../errors/incorrectRequisition.js';
import ValidationError from '../errors/validationError.js';
import DuplicateError from '../errors/duplicateError.js';
import UnathorizedError from '../errors/unathorizedError.js';

function ErrorHandler(error, res) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequisition().sendError(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendError(res);
  } else if (error instanceof ErrorBase) {
    error.sendError(res);
  } else if (error.code === 11000) {
    new DuplicateError(error).sendError(res);
  } else if (error instanceof jwt.TokenExpiredError) {
    new UnathorizedError('Access token expired!').sendError(res);
  } else if (error instanceof jwt.JsonWebTokenError) {
    new UnathorizedError('Invalid access token!').sendError(res);
  } else {
    new ErrorBase().sendError(res);
  }
}

export default ErrorHandler;
