// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById("login-form");
const attendanceForm = document.getElementById("attendance-form");
const loginSection = document.getElementById("login-section");
const attendanceSection = document.getElementById("attendance-section");
const logoutBtn = document.getElementById("logout-btn");

// Login event listener
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);
    loginSection.style.display = "none";
    attendanceSection.style.display = "block";
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
});

// Attendance record event listener
attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const studentId = document.getElementById("student-id").value;
  const date = document.getElementById("date").value;

  try {
    await setDoc(doc(db, "attendance", studentId), {
      date: date,
      status: "present"
    });
    console.log("Attendance recorded for student:", studentId);
  } catch (error) {
    console.error("Error recording attendance:", error.message);
  }
});

// Logout event listener
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    attendanceSection.style.display = "none";
    loginSection.style.display = "block";
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
});
