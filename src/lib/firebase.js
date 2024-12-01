import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN4b91qetSGMkEvUM8TviG8ZkD5DZ4cSQ",
  authDomain: "zealthy-test.firebaseapp.com",
  projectId: "zealthy-test",
  storageBucket: "zealthy-test.firebasestorage.app",
  messagingSenderId: "12639225378",
  appId: "1:12639225378:web:3338959a11e142e73bec7b",
  measurementId: "G-ZWRGYDCMLR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };