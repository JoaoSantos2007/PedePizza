import ErrorBase from './errorBase.js';

class NotFoundError extends ErrorBase {
  constructor(message = 'Route not found!') {
    super(message, 404);
  }
}

export default NotFoundError;
