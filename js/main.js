const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// day first


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem('Delivery');

function toogleModalAuth() {
  modalAuth.classList.toggle( 'is-open');
  if (modalAuth.classList.contains('is-open')) {
    disabledScroll();
  } else {
    enableScroll();
  }
}

function clearForm() {
  loginInput.style.borderColor = '';
  logInForm.reset();
}

function authorized() {

  function logOut() {
    login = null;

    localStorage.removeItem('Delivery')

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }
  console.log('Авторизован');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut)
}

function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    event.preventDefault();
    
    if(loginInput.value.trim()) {
      login = loginInput.value;

      localStorage.setItem('Delivery', login);
  
      toogleModalAuth();

      buttonAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      
      checkAuth();
    } else {
      loginInput.style.borderColor = '#ff0000';
      loginInput.value = '';
    }
    
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function(event) {
    if (event.target.classList.contains('is-open')) { 
      toogleModalAuth();
    }
  })
}

buttonAuth.addEventListener('click', clearForm);

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();