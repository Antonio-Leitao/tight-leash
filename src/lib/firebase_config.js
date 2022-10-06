// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { replace } from "svelte-spa-router";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const LogIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.table(`User Email ${user.email}`);
      console.table(`User name ${user.displayName}`);
      console.log(auth.currentUser.email);
      authenticateUser();

      replace("/researchers");
    })
    .catch((error) => {});
};

export const logOut = () => {
  signOut(auth).then(() => {
    replace("/");
  });
};

export async function authenticateUser() {
  //check first if a user is logged in
  //if a user is logged in
  const q = query(
    collection(db, "users"),
    where("email", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
