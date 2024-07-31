// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "yumyum-3d3f4.firebaseapp.com",
  projectId: "yumyum-3d3f4",
  storageBucket: "yumyum-3d3f4.appspot.com",
  messagingSenderId: "453876772926",
  appId: "1:453876772926:web:a2f3df641af720fb10216f",
  measurementId: "G-KT518HHHXY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
