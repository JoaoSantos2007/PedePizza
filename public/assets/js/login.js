import { api, navigate } from './script.js';

$('#loginForm').on('submit', async (event) => {
  event.preventDefault();

  login({
    email: $('#emailInput').val(),
    password: (window.document.getElementById('pwdInput')).value,
  });
});

function login(user) {
  api('/login', 'POST', user, (data) => {
    if (data.authenticated) navigate('/account.html');
  });
}

export { login };
