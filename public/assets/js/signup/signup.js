import createUser from '../createUser.js';
import login from '../login.js';
import errorHandler from '../errorHandler.js';
import navigate from '../navigate.js';

const cancelBtn = document.querySelector('#cancelBTN');
cancelBtn.addEventListener('click', () => {
  navigate('/login.html');
});

const form = document.querySelector('#signupForm');
form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();

    const user = {
      name: (document.querySelector('#inputName')).value,
      email: (document.querySelector('#inputEmail')).value,
      password: (document.querySelector('#inputPassword')).value,
      img: (document.querySelector('#inputUserIMG')).value,
    };

    const userCreated = await createUser(user);
    if (!userCreated) throw new Error('Usuáruio não criado');

    const logged = await login(user);
    if (!logged) throw new Error('Authentication Failed');

    // navigate('/index.html');
  } catch (err) {
    errorHandler(err);
  }
});
