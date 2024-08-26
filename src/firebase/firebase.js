// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn1fEyobjFblxFhGNgmpfPs4voQ1UH5gw",
  authDomain: "test-4b239.firebaseapp.com",
  projectId: "test-4b239",
  storageBucket: "test-4b239.appspot.com",
  messagingSenderId: "849613391960",
  appId: "1:849613391960:web:c76f2b076cdaac6620222d",
  measurementId: "G-3Y36FN05XQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
