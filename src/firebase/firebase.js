// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOOxHHBYIWDSAK9ZwO7ZTCtWtipZVYj60",
  authDomain: "case-dc7c7.firebaseapp.com",
  projectId: "case-dc7c7",
  storageBucket: "case-dc7c7.appspot.com",
  messagingSenderId: "507751574291",
  appId: "1:507751574291:web:19eb84f303db8d171348e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
