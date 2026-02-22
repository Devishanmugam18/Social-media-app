// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcqFqws7HSXirjbZjxizrEGvDFtXMt_Fg",
  authDomain: "socialmediafeed-852e0.firebaseapp.com",
  projectId: "socialmediafeed-852e0",
  storageBucket: "socialmediafeed-852e0.firebasestorage.app",
  messagingSenderId: "1054601560686",
  appId: "1:1054601560686:web:c1f02891fd31ff99179c7f",
  measurementId: "G-R8J3FZ9NHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Expose commonly used Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
