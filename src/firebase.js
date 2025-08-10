import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAePpf5f_LQfxCSXq8JrEWZJLqbyemHPsc",
  authDomain: "academic-management-22f9b.firebaseapp.com",
  projectId: "academic-management-22f9b",
  storageBucket: "academic-management-22f9b.firebasestorage.app",
  messagingSenderId: "287972403971",
  appId: "1:287972403971:web:ab52b53b8bd9954614d736",
  measurementId: "G-GGZJ22YQRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);