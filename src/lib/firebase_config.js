// Import the functions you need from the SDKs you need
const allowed_users = ["Giovanni", "Antonio", "Maxime", "Simone", "Admin"];
export const admin_users = ["Giovanni", "Admin"];
export const prefixes = [
  "New ",
  "Improved ",
  "A better ",
  "Second try on ",
  "Repeated ",
  "Revamped ",
  "Upgraded ",
  "Enhanced ",
  "Refined ",
  "Boosted ",
  "Polished ",
];
export const suffixes = [
  "v0.1",
  " beta",
  ".com",
  ".Inc",
  "(patent pending)",
  "v0.01",
  "v2.0",
  " alpha",
  "pre-release",
];

/////////FIREBASE////////
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

//returns true if a user is online
export function isUserLogged() {
  return auth.currentUser !== null;
}

export async function userData() {
  //check first if a user is logged in
  if (!isUserLogged()) {
    replace("/denied");
    return;
  }

  //if a user is logged in, which one?
  const q = query(
    collection(db, "users"),
    where("email", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size < 1) {
    return { alias: "John Doe" };
  }
  let data;
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  return data;
}

export async function personColor(person) {
  const q = query(collection(db, "users"), where("alias", "==", person));
  const querySnapshot = await getDocs(q);
  let color;
  querySnapshot.forEach((doc) => {
    color = doc.data().color;
  });
  return color;
}

export async function userName() {
  if (isUserLogged) {
    let user = await userData();
    return user.alias;
  }
  replace("/denied");
}

export async function authUser() {
  let user = await userData();
  return allowed_users.includes(user.alias);
}

export async function routeGuard(route) {
  let user = await userData();
  return user.alias === route || admin_users.includes(user.alias);
}
