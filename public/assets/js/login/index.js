import login from './login.js';

const form = document.querySelector('#form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = (document.querySelector('#emailInput')).value;
  const password = (document.querySelector('#pwdInput')).value;

  login({ email, password });
});
