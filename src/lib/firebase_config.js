
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC23wsoyc023qDbk4lCtPLpK04YEdxl5WQ",
    authDomain: "order66-6f98d.firebaseapp.com",
    projectId: "order66-6f98d",
    storageBucket: "order66-6f98d.appspot.com",
    messagingSenderId: "938717200292",
    appId: "1:938717200292:web:e44e24579156d2e4888b31",
  };


  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
//initialize firestore
export const db = getFirestore(app);