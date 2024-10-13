// login.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Check if the user is admin and redirect
      if (user.email === "ledmov@outlook.com") {
        window.location.href = "/admin.html";  // Admin page
      } else {
        window.location.href = "/home.html";  // Regular page
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;
      errorMessage.innerText = `Error: ${errorMessageText}`;
    });
});
