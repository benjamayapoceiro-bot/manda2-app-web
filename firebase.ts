import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD8U7l7zaHmP9nAooeoTaSp5qZf5RHVxNY",
  authDomain: "manda2-832ab.firebaseapp.com",
  projectId: "manda2-832ab",
  storageBucket: "manda2-832ab.firebasestorage.app",
  messagingSenderId: "594050121025",
  appId: "1:594050121025:web:ed5ba6c25174a35ea8f5c0",
  measurementId: "G-T91F2E271M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Flag to tell the app we are using Real Firebase
export const shouldUseFirebase = true; 
