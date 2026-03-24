import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuW-lrv7-otXQlEUo7UD-ULfk2XR3zj1Q",
  authDomain: "hue3-19a7b.firebaseapp.com",
  projectId: "hue3-19a7b",
  storageBucket: "hue3-19a7b.firebasestorage.app",
  messagingSenderId: "584949859591",
  appId: "1:584949859591:web:4b9d8c93687fbeda1af1a2",
  measurementId: "G-PNN1LLVY01"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
