// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnO1tq_m2M0OO93nL4Apzd8fwzdmJDxEI",
  authDomain: "idify-489ea.firebaseapp.com",
  projectId: "idify-489ea",
  storageBucket: "idify-489ea.firebasestorage.app",
  messagingSenderId: "820999124264",
  appId: "1:820999124264:web:778e07a98adf53f530cc1d",
  measurementId: "G-XDD0FTRKPS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // ✅ ADD THIS

export default app;