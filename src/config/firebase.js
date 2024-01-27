import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAr1mzFLAcVEvIKiu6gYt33BlYmyKOhvos",
  authDomain: "fir-users-app-44932.firebaseapp.com",
  projectId: "fir-users-app-44932",
  storageBucket: "fir-users-app-44932.appspot.com",
  messagingSenderId: "35376707634",
  appId: "1:35376707634:web:8fea35036285fcdae6642b",
  measurementId: "G-KMG0CTFZ9D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);