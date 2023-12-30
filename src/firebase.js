// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGnrbc9YWCy9Ou_aEMLYN0m1iNirTrSPo",
  authDomain: "podcast-platform-130eb.firebaseapp.com",
  projectId: "podcast-platform-130eb",
  storageBucket: "podcast-platform-130eb.appspot.com",
  messagingSenderId: "357918698539",
  appId: "1:357918698539:web:e107c9f8936393214f4e6e",
  measurementId: "G-K6TRCLG9S2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };