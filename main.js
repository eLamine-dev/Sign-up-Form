let form = document.querySelector(".form");
let firstName = form.elements.namedItem("first-name");
let lastName = form.elements.namedItem("last-name");
let email = form.elements.namedItem("email");
let phoneNum = form.elements.namedItem("phone-num");
let password = form.elements.namedItem("password");
let passConfirm = form.elements.namedItem("confirm-pass");
let reg = {
   "first-name": /^[-'a-zA-Z]{2,15}$/,
   "last-name": /^[-'a-zA-Z]{2,15}$/,
   email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
   "phone-num":
      /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
   password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/,
   // "confirm-pass": new RegExp('\W*('  ")\W", "g"),
};

firstName.addEventListener("input", validate);
lastName.addEventListener("input", validate);
email.addEventListener("input", validate);
phoneNum.addEventListener("input", validate);
password.addEventListener("input", validate);
passConfirm.addEventListener("input", validate);
passConfirm.addEventListener("input", (e) => {
   if (passConfirm.value === password.value) {
      e.target.classList.add("valid");
      e.target.classList.remove("invalid");
      e.target.nextElementSibling.style.visibility = "hidden";
   } else {
      e.target.classList.add("invalid");
      e.target.classList.remove("valid");
      e.target.nextElementSibling.style.visibility = "visible";
   }
});

function validate(e) {
   if (reg[e.target.name].test(e.target.value)) {
      e.target.classList.add("valid");
      e.target.classList.remove("invalid");
      e.target.nextElementSibling.style.visibility = "hidden";
   } else {
      e.target.classList.add("invalid");
      e.target.classList.remove("valid");
      e.target.nextElementSibling.style.visibility = "visible";
   }
}
