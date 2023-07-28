import errorHandler from '../errorHandler.js';
import navigate from '../navigate.js';
import Auth from '../requests/Auth.js';
import User from '../requests/User.js';

const logoutBtn = document.querySelector('#logoutBTN');
logoutBtn.addEventListener('click', async () => {
  try {
    await Auth.logout();
    navigate('.');
  } catch (err) {
    errorHandler(err);
  }
});

const deleteBTN = document.querySelector('#deleteBTN');
deleteBTN.addEventListener('click', async () => {
  try {
    // eslint-disable-next-line no-alert
    const result = window.confirm('Você realmente deseja apagar esta conta?');
    if (!result) return;

    await User.delete();
    navigate('.');
  } catch (err) {
    errorHandler(err);
  }
});

const renderUser = (user) => {
  const userNameElement = document.querySelector('#userName');
  const userImgElement = document.querySelector('#userImg');

  const names = user.name.split(' ');

  const firstName = names[0];
  const lastName = names[names.length - 1];

  userNameElement.textContent = `${firstName} ${lastName}`;

  if (!user.img) return;
  userImgElement.src = user.img;
};

window.addEventListener('load', async () => {
  try {
    const user = await User.get();
    renderUser(user);
  } catch (err) {
    errorHandler(err);
  }
});
