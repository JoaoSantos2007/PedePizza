import errorHandler from '../errorHandler.js';
import navigate from '../navigate.js';
import Auth from '../requests/Auth.js';
import User from '../requests/User.js';

const form = document.querySelector('#signupForm');
form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const user = {
      name: (document.querySelector('#inputName')).value,
      email: (document.querySelector('#inputEmail')).value,
      password: (document.querySelector('#inputPassword')).value,
    };

    await User.post(user);
    await Auth.login(user);

    navigate('/index.html');
  } catch (err) {
    errorHandler(err);
  }
});
