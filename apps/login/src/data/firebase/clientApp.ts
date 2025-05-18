// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANMorni2MTQMfa_ZzANFWn4xWOrZozHzc",
  authDomain: "fiap-farm.firebaseapp.com",
  projectId: "fiap-farm",
  storageBucket: "fiap-farm.firebasestorage.app",
  messagingSenderId: "534946388282",
  appId: "1:534946388282:web:2c8791885f286891c0d803",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
