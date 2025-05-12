// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvXZ2k23t1ftG6x3eEz01sQhoHBszKF3o",
  authDomain: "intervue-6ad00.firebaseapp.com",
  projectId: "intervue-6ad00",
  storageBucket: "intervue-6ad00.firebasestorage.app",
  messagingSenderId: "560833226341",
  appId: "1:560833226341:web:2009a503fe3714bb64888c",
  measurementId: "G-GLDJ3X2897"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);