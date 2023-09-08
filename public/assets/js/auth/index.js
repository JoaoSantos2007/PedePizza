import errorHandler from '../utils/errorHandler.js';
import navigate from '../utils/navigate.js';
import Auth from '../requests/Auth.js';
import User from '../requests/User.js';
import getFormType from './getFormType.js';
import loadSignUpFormType from './loadSignUpFormType.js';

const formType = getFormType();

const form = document.querySelector('#authForm');
form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const user = {
      name: (document.querySelector('#inputName')).value,
      email: (document.querySelector('#inputEmail')).value,
      password: (document.querySelector('#inputPassword')).value,
    };

    if (formType === 'signup') await User.post(user);

    await Auth.login(user);

    navigate('/index.html');
  } catch (err) {
    errorHandler(err);
  }
});

window.addEventListener('load', () => {
  if (formType === 'signup') {
    loadSignUpFormType();
  }
});
