// Import the functions you need from the SDKs you need
const allowed_users = ["Giovanni", "Antonio", "Maxime", "Simone"];
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
      replace("/researchers");
    })
    .catch((error) => {});
};

export const logOut = () => {
  signOut(auth).then(() => {
    replace("/");
  });
};

export async function userAlias() {
  //check first if a user is logged in
  //if a user is logged in
  const q = query(
    collection(db, "users"),
    where("email", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size < 1) {
    return "not recognized";
  }
  let name;
  querySnapshot.forEach((doc) => {
    name = doc.data().alias;
  });
  return name;
}

export async function authUser() {
  let user = await userAlias();
  return allowed_users.includes(user);
}

export async function routeGuard(route) {
  let user = await userAlias();
  return user === route || user === "Giovanni";
}
