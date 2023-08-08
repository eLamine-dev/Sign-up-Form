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
   'phone-num': `[0-9]{3}-?[0-9]{2}-?[0-9]{3}`,
   password: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*',
};

form.addEventListener('submit', validateSubmit);
passConfirm.addEventListener('input', checkPasswordConfirm);
password.addEventListener('input', checkPasswordConfirm);
inputs.forEach((input) => {
   input.setAttribute('value', input.value);
   if (reg[input.name]) {
      input.setAttribute('pattern', reg[input.name]);
   }

   input.addEventListener('input', (ev) => {
      showHideErrorMsg(ev.target);
   });

   input.addEventListener('focus', (ev) => {
      showHideErrorMsg(ev.target);
   });

   input.addEventListener('blur', (ev) => {
      hideErrorMsg(ev.target);
   });
});

function showHideErrorMsg(target) {
   target.setAttribute('value', target.value);
   if (target.checkValidity()) {
      target.nextElementSibling.style.visibility = 'hidden';
   } else {
      target.nextElementSibling.style.visibility = 'visible';
   }
   console.log(target.validity);
}

function hideErrorMsg(target) {
   if (target.value) target.nextElementSibling.style.visibility = 'hidden';
}

function validateSubmit(event) {
   if (
      Array.from(inputs).some(
         (input) => !input.checkValidity() || input.value == ''
      )
   ) {
      event.preventDefault();
      inputs.forEach((input) => {
         if (!input.checkValidity()) {
            showHideErrorMsg(input);
         }
      });
   }
}

function checkPasswordConfirm() {
   if (passConfirm.value !== '') {
      if (passConfirm.value !== password.value) {
         passConfirm.setCustomValidity('Passwords do not match');
         showHideErrorMsg(passConfirm);
      } else if (passConfirm.value === password.value) {
         passConfirm.setCustomValidity('');
         showHideErrorMsg(passConfirm);
      }
   }
}
