import ErrorHandler from '../utils/errorHandler.js';

// eslint-disable-next-line no-unused-vars
function ErrorMiddleware(error, req, res, next) {
  ErrorHandler(error, res);
}

export default ErrorMiddleware;
