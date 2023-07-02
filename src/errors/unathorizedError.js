import ErrorBase from './errorBase.js';

class UnathorizedError extends ErrorBase {
  constructor(message = 'You need admin!', status = 401) {
    super(message, status);
  }
}

export default UnathorizedError;
