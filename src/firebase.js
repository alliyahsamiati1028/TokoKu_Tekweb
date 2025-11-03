// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "AUTH_DOMAIN_KAMU",
  projectId: "PROJECT_ID_KAMU",
  storageBucket: "STORAGE_BUCKET_KAMU",
  messagingSenderId: "SENDER_ID_KAMU",
  appId: "APP_ID_KAMU"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
