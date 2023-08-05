const loadSignUpFormType = () => {
  const formTitle = document.querySelector('.form__title');
  formTitle.textContent = 'Create Account';

  const inputName = document.querySelector('.form__field--input-name');
  inputName.style.display = 'flex';

  const formSubmit = document.querySelector('.form__submit');
  formSubmit.value = 'SIGN UP';

  const infoLogin = document.querySelector('.info__login');
  infoLogin.textContent = 'Already have an account? ';
  infoLogin.innerHTML += '<a class="login__hyperlink" href="auth.html">Log In</a>';
};

export default loadSignUpFormType;
