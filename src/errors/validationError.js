import ErrorBase from './errorBase.js';

class ValidationError extends ErrorBase {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((err) => err.message)
      .join('; ');

    super(`The following errors were found: ${errorMessages}`, 400);
  }
}

export default ValidationError;
