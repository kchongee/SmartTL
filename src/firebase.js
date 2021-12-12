// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDekk741MySs8fpAVO_RkZqWD-lBOI_U2c",
  authDomain: "smarttl-e6d87.firebaseapp.com",
  databaseURL: "https://smarttl-e6d87-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarttl-e6d87",
  storageBucket: "smarttl-e6d87.appspot.com",
  messagingSenderId: "48089324075",
  appId: "1:48089324075:web:12539671d013d78fc8686e",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

export {db, auth};