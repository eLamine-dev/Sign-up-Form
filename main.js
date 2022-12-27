const form = document.querySelector(".form");
const pass_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
const names_reg = /^[-'a-zA-Z]{2,12}$/;
const email_reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let firstName = form.elements.namedItem("first-name");
let lastName = form.elements.namedItem("last-name");
let email = form.elements.namedItem("email");
let phoneNum = form.elements.namedItem("phone-num");
let password = form.elements.namedItem("password");
let passConfirm = form.elements.namedItem("confirm-pas");

firstName.addEventListener("input", validate);
lastName.addEventListener("input", validate);
email.addEventListener("input", validate);
phoneNum.addEventListener("input", validate);
password.addEventListener("input", validate);
passConfirm.addEventListener("input", validate);

function validate(e, reg) {
   if (e.target.name == "password") {
      if (pass_reg.test(e.target.value)) {
         e.target.classList.add("valid");
         e.target.classList.remove("invalid");
      } else {
         e.target.classList.add("invalid");
         e.target.classList.remove("valid");
      }
   }

   if (e.target.name == "first-name" || e.target.name == "last-name") {
      if (names_reg.test(e.target.value)) {
         e.target.classList.add("valid");
         e.target.classList.remove("invalid");
      } else {
         e.target.classList.add("invalid");
         e.target.classList.remove("valid");
      }
   }

   if (e.target.name == "email") {
      if (email_reg.test(e.target.value)) {
         e.target.classList.add("valid");
         e.target.classList.remove("invalid");
      } else {
         e.target.classList.add("invalid");
         e.target.classList.remove("valid");
      }
   }
}
