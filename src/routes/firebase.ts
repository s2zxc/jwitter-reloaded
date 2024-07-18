import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0fUNqFZgC6KiL20zRl-uuSGwODmuRtDE",
  authDomain: "jwitter-reloaded-23c0a.firebaseapp.com",
  projectId: "jwitter-reloaded-23c0a",
  storageBucket: "jwitter-reloaded-23c0a.appspot.com",
  messagingSenderId: "975211098109",
  appId: "1:975211098109:web:f803dbcbfda328109d3394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app); // firebase storage 사용

export const db = getFirestore(app); // firebase DB 사용
