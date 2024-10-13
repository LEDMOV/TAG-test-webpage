// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB3ZopY7WAPCdSdg2eH3zBoHu5fpx9bud0",
    authDomain: "tag-attendance-test.firebaseapp.com",
    projectId: "tag-attendance-test",
    storageBucket: "tag-attendance-test.appspot.com",
    messagingSenderId: "763932877128",
    appId: "1:763932877128:web:3b49d24002fb961ed0537d",
    measurementId: "G-B8G8JY0FL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to login user
async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to log out user
async function logoutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
}

export { auth, loginUser, logoutUser };
