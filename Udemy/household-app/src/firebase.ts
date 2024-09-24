// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt0147lJkXrd-pj4DukgAgwPP7Fb9yBEM",
  authDomain: "household-app-20aeb.firebaseapp.com",
  projectId: "household-app-20aeb",
  storageBucket: "household-app-20aeb.appspot.com",
  messagingSenderId: "1075115004418",
  appId: "1:1075115004418:web:0b0d8dd448153e947f8d1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };