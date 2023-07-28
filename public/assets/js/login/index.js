import errorHandler from '../errorHandler.js';
import Auth from '../requests/Auth.js';
import navigate from '../navigate.js';

const form = document.querySelector('#form');
form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const email = (document.querySelector('#emailInput')).value;
    const password = (document.querySelector('#pwdInput')).value;

    await Auth.login({ email, password });
    navigate('/index.html');
  } catch (err) {
    errorHandler(err);
  }
});
