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
   password: '(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*',
};

form.addEventListener('submit', validateSubmit);
password.addEventListener('input', checkPasswordConfirm);
inputs.forEach((input) => {
   input.setAttribute('value', input.value);
   if (reg[input.name]) {
      input.setAttribute('pattern', reg[input.name]);
   }

   input.addEventListener('input', (ev) => {
      showHideErrorMsg(ev.target);
   });
   input.addEventListener('blur', (ev) => {
      showHideErrorMsg(ev.target);
   });
});

function showHideErrorMsg(target) {
   target.setAttribute('value', target.value);
   if (target.checkValidity()) {
      target.nextElementSibling.style.visibility = 'hidden';
   } else {
      target.nextElementSibling.style.visibility = 'visible';
   }
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
         showHideErrorMsg(input);
      }
   });
}

function checkPasswordConfirm(e) {
   if (passConfirm.value !== '') {
      if (passConfirm.value !== password.value) {
         passConfirm.setCustomValidity('Passwords do not match');
         showHideErrorMsg(e.target);
      } else if (passConfirm.value === password.value) {
         passConfirm.setCustomValidity('');
         showHideErrorMsg(e.target);
      }
   }
}
