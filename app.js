// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  // Function to log in
  async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      await auth.signInWithEmailAndPassword(email, password);
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('attendance-form').style.display = 'block';
    } catch (error) {
      document.getElementById('login-error').innerText = error.message;
    }
  }
  
  // Function to log attendance
  async function logAttendance() {
    const user = auth.currentUser;
  
    if (user) {
      const attendanceRef = firestore.collection('attendance');
      await attendanceRef.add({
        userEmail: user.email,
        timestamp: new Date()
      });
      alert("Attendance recorded!");
    } else {
      alert("You must log in first.");
    }
  }
  