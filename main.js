let form = document.querySelector(".form");
let firstName = form.elements.namedItem("first-name");
let lastName = form.elements.namedItem("last-name");
let email = form.elements.namedItem("email");
let phoneNum = form.elements.namedItem("phone-num");
let password = form.elements.namedItem("password");
let passConfirm = form.elements.namedItem("confirm-pass");
let inputs = form.querySelectorAll("input");

let reg = {
   "first-name": /^[-'a-zA-Z]{2,15}$/,
   "last-name": /^[-'a-zA-Z]{2,15}$/,
   email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
   "phone-num":
      /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
   password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,
   // "confirm-pass": ,
};

form.addEventListener("submit", validateSubmit);
password.addEventListener("input", checkPasswordConfirm);
inputs.forEach((input) => {
   input.addEventListener("input", validate);
   input.addEventListener("focus", showErrorMsg);
   input.addEventListener("input", showErrorMsg);
   input.addEventListener("blur", hideErrorMsg);
});

function validate(e) {
   if (e.target.name == "confirm-pass") {
      if (passConfirm.value === password.value || e.target.value == "") {
         e.target.classList.add("valid");
         e.target.classList.remove("invalid");
      } else {
         e.target.classList.add("invalid");
         e.target.classList.remove("valid");
      }
   } else if (reg[e.target.name].test(e.target.value) || e.target.value == "") {
      e.target.classList.add("valid");
      e.target.classList.remove("invalid");
   } else {
      e.target.classList.add("invalid");
      e.target.classList.remove("valid");
   }
}

function showErrorMsg(e) {
   if (e.target.classList.contains("valid") || e.target.value == "") {
      e.target.nextElementSibling.style.visibility = "hidden";
      e.target.style.border = "2px solid var(--light-blue)";
   } else if (e.target.classList.contains("invalid")) {
      e.target.nextElementSibling.style.visibility = "visible";
      e.target.style.border = "2px solid var(--red-alerts)";
   }
}

function hideErrorMsg(e) {
   e.target.nextElementSibling.style.visibility = "hidden";
   e.target.style.border = "none";
}

function validateSubmit(event) {
   if (
      Array.from(inputs).some(
         (input) => input.classList.contains("invalid") || input.value == ""
      )
   ) {
      event.preventDefault();
      alertOnSubmit();
   }
}

function alertOnSubmit() {
   inputs.forEach((input) => {
      if (input.classList.contains("invalid") || input.value == "") {
         input.classList.add("invalid");
         input.classList.remove("valid");
         input.nextElementSibling.style.visibility = "visible";
      }
   });
}

function checkPasswordConfirm() {
   if (passConfirm.value !== "") {
      if (passConfirm.value !== password.value) {
         passConfirm.classList.add("invalid");
         passConfirm.classList.remove("valid");
         passConfirm.nextElementSibling.style.visibility = "visible";
      } else if (passConfirm.value === password.value) {
         passConfirm.classList.remove("invalid");
         passConfirm.classList.add("valid");
         passConfirm.nextElementSibling.style.visibility = "hidden";
      }
   }
}
