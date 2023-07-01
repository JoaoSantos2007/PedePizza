import ErrorBase from './errorBase.js';

class IncorrectRequisition extends ErrorBase {
  constructor(message = 'One or more fields provided are incorrect!') {
    super(message, 400);
  }
}

export default IncorrectRequisition;
