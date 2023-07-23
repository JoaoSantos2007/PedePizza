import errorHandler from '../errorHandler.js';
import logout from '../logout.js';

const logoutBtn = document.querySelector('#logoutBTN');
logoutBtn.addEventListener('click', async () => {
  try {
    const left = await logout();
    if (left) window.location.reload();
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

    // eslint-disable-next-line no-undef
    const response = await axios.delete('/user');
    if (response.status === 200) window.location.reload();
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
    // eslint-disable-next-line no-undef
    const response = await axios.get('/user');
    const { data } = response;

    renderUser(data.user);
  } catch (err) {
    errorHandler(err);
  }
});
