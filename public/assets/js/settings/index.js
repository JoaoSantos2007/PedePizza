import User from '../requests/User.js';
import errorHandler from '../utils/errorHandler.js';
import navigate from '../utils/navigate.js';

const inputName = document.querySelector('#userName');
const inputImg = document.querySelector('#userImg');

const settingsCancelBtn = document.querySelector('#settings-cancel');
settingsCancelBtn.addEventListener('click', () => {
  navigate('/account.html');
});

const settingsSaveBtn = document.querySelector('#settings-save');
settingsSaveBtn.addEventListener('click', async () => {
  try {
    const user = {
      name: inputName.value || '',
      img: inputImg.value || '',
    };

    await User.put(user);
    navigate('/account.html');
  } catch (err) {
    errorHandler(err);
  }
});

const setInput = ({ name, img }) => {
  inputName.value = name || '';
  inputImg.value = img || '';
};

window.addEventListener('load', async () => {
  try {
    const user = await User.get();
    return setInput(user);
  } catch (err) {
    return errorHandler(err);
  }
});
