// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDleZP68U5BZFEY7CgDa08hYAq6DmBOhM8",
  authDomain: "borrow-3ccfb.firebaseapp.com",
  projectId: "borrow-3ccfb",
  storageBucket: "borrow-3ccfb.firebasestorage.app",
  messagingSenderId: "528917038886",
  appId: "1:528917038886:web:ffaf4e315aa698379663e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
