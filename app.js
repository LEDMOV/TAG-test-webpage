// app.js

import { auth, loginUser, logoutUser } from './firebase.js';  // Import Firebase methods from firebase.js
import { onAuthStateChanged } from "firebase/auth";

const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const userStatus = document.getElementById('user-status');

// Handle form submission for login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        await loginUser(email, password);  // Firebase login function
    } catch (error) {
        console.error("Error logging in:", error.message);
    }
});

// Handle logout
logoutButton.addEventListener('click', async () => {
    try {
        await logoutUser();  // Firebase logout function
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
});

// Track authentication state
onAuthStateChanged(auth, user => {
    if (user) {
        userStatus.textContent = `Welcome, ${user.email}`;
        logoutButton.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        userStatus.textContent = 'Not logged in';
        logoutButton.style.display = 'none';
        loginForm.style.display = 'block';
    }
});
