// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-cc1fd.firebaseapp.com",
  projectId: "mern-auth-cc1fd",
  storageBucket: "mern-auth-cc1fd.appspot.com",
  messagingSenderId: "270284219740",
  appId: "1:270284219740:web:75dd7590213eb52a958d99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);