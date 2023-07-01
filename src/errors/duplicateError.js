import ErrorBase from './errorBase.js';

class DuplicateError extends ErrorBase {
  constructor(error) {
    const propertyName = error.keyValue.name;
    const message = `The value provided must be unique. ${propertyName} is already registered!`;

    super(message, 400);
  }
}

export default DuplicateError;
