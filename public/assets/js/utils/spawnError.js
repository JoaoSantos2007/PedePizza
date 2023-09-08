import url from './url.js';

const spawnError = (error) => {
  const errorElement = document.createElement('section');
  errorElement.classList.add('error');

  const errorHeader = document.createElement('div');
  errorHeader.classList.add('error__header');

  const errorClose = document.createElement('img');
  errorClose.classList.add('error__close');
  errorClose.src = `${url}/assets/img/close.svg`;
  errorClose.addEventListener('click', () => {
    errorElement.style.display = 'none';
  });

  const errorMain = document.createElement('div');
  errorMain.classList.add('error__main');

  const errorName = document.createElement('p');
  errorName.classList.add('error__name');
  errorName.textContent = `${error.name}: `;

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error__message');
  errorMessage.textContent = error.message;

  errorHeader.append(errorClose);
  errorMain.append(errorName);
  errorMain.append(errorMessage);
  errorElement.append(errorHeader, errorMain);

  document.body.append(errorElement);
};

export default spawnError;
