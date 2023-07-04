import ErrorBase from './errorBase.js';

class DuplicateError extends ErrorBase {
  constructor(error) {
    const value = Object.values(error.keyValue);
    const message = `The value provided must be unique. ${value} is already registered!`;

    super(message, 400);
  }
}

export default DuplicateError;
