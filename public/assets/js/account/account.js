import { api, navigate } from './script.js';

$('documento').ready(() => {
  api('/user', 'GET', null, (user) => {
    if (user.email) renderUserData(user);
    else navigate('/login.html');
  });
});

$('#logoutBTN').click(() => {
  api('/logout', 'POST', null, (data) => {
    if (data.left) navigate('/login.html');
  });
});

$('#deleteBTN').click(() => {
  const confirmDeleteUser = window.confirm('Você deseja apagar esta conta?');

  if (!confirmDeleteUser) return;

  api('/user', 'DELETE', null, (data) => {
    if (data.deleted) navigate('/login.html');
  });
});

function renderUserData(user) {
  const name = user.name.split(' ');

  const firstName = name[0];
  const lastName = name[(name.length - 1)];

  $('#userName').text(`${firstName} ${lastName}`);
  $('#userEmail').text(user.email);
  $('#userID').text(user.id);

  if (user.img) {
    $('#userImg').attr('src', user.img);
  }
}
