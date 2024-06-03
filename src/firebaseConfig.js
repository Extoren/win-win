// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDNOLkSxlpOzYgidDN1X8cY4haV58mpcw",
  authDomain: "win-win-f5bb9.firebaseapp.com",
  projectId: "win-win-f5bb9",
  storageBucket: "win-win-f5bb9.appspot.com",
  messagingSenderId: "658854802310",
  appId: "1:658854802310:web:52924dfff099698a6df207",
  measurementId: "G-LNGNGE7ESS",
  databaseURL: "https://win-win-f5bb9-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const googleAuthProvider = new GoogleAuthProvider();

export { auth };