// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCE-Kp-bsuftJ690S75MtThBcKKcw1pdGo",
  authDomain: "vuejstodo-50909.firebaseapp.com",
  projectId: "vuejstodo-50909",
  storageBucket: "vuejstodo-50909.firebasestorage.app",
  messagingSenderId: "499192751090",
  appId: "1:499192751090:web:11f66659dcb5268ee2416b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
