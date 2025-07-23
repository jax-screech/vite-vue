// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3jqyMu83WgRgPOc0fwJsOMwUhGirQYB4",
  authDomain: "vitevue-86a16.firebaseapp.com",
  projectId: "vitevue-86a16",
  storageBucket: "vitevue-86a16.firebasestorage.app",
  messagingSenderId: "35495179959",
  appId: "1:35495179959:web:367e05d339658998a43f32",
  measurementId: "G-TKTXD0BQMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();


export {auth, provider }