let form = document.querySelector('.form');
let firstName = form.elements.namedItem('first-name');
let lastName = form.elements.namedItem('last-name');
let email = form.elements.namedItem('email');
let phoneNum = form.elements.namedItem('phone-num');
let password = form.elements.namedItem('password');
let passConfirm = form.elements.namedItem('confirm-pass');
let inputs = form.querySelectorAll('input');

let reg = {
   'first-name': `[a-zA-Z]+`,
   'last-name': `[a-zA-Z]+`,

   password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,
   // "confirm-pass": ,
};

form.addEventListener('submit', validateSubmit);
password.addEventListener('input', checkPasswordConfirm);
inputs.forEach((input) => {
   if (reg[input.name]) {
      input.setAttribute('pattern', reg[input.name]);
   }
   input.addEventListener('input', validate);
   input.addEventListener('focus', showErrorMsg);
   input.addEventListener('input', showErrorMsg);
   input.addEventListener('blur', hideErrorMsg);
});

function validate(e) {
   if (e.target.name == 'confirm-pass') {
      if (
         (passConfirm.value === password.value &&
            reg.password.test(passConfirm.value)) ||
         e.target.value == ''
      ) {
         e.target.classList.add('valid');
         e.target.classList.remove('invalid');
      } else {
         e.target.classList.add('invalid');
         e.target.classList.remove('valid');
      }
   }
}

function showErrorMsg(e) {
   if (e.target.checkValidity()) {
      e.target.nextElementSibling.style.visibility = 'hidden';
   } else {
      e.target.nextElementSibling.style.visibility = 'visible';
   }
}

function hideErrorMsg(e) {
   e.target.nextElementSibling.style.visibility = 'hidden';
   e.target.style.border = 'none';
}

function validateSubmit(event) {
   if (
      Array.from(inputs).some(
         (input) => !input.checkValidity() || input.value == ''
      )
   ) {
      event.preventDefault();
      alertOnSubmit();
   }
}

function alertOnSubmit() {
   inputs.forEach((input) => {
      if (!input.checkValidity()) {
         input.nextElementSibling.style.visibility = 'visible';
      }
   });
}

function checkPasswordConfirm() {
   if (passConfirm.value !== '') {
      if (passConfirm.value !== password.value) {
         passConfirm.classList.add('invalid');
         passConfirm.classList.remove('valid');
         passConfirm.nextElementSibling.style.visibility = 'visible';
      } else if (passConfirm.value === password.value) {
         passConfirm.classList.remove('invalid');
         passConfirm.classList.add('valid');
         passConfirm.nextElementSibling.style.visibility = 'hidden';
      }
   }
}
