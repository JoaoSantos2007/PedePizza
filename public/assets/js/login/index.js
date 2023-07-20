import errorHandler from '../errorHandler.js';
import login from './login.js';

const form = document.querySelector('#form');

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const email = (document.querySelector('#emailInput')).value;
    const password = (document.querySelector('#pwdInput')).value;

    await login({ email, password });
  } catch (err) {
    errorHandler(err);
  }
});
