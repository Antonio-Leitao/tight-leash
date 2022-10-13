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

let NPC = {
  logged_in: false,
  alias: undefined,
  color: undefined,
};

export const LogIn = () => {
  signInWithPopup(auth, provider)
    .then(readUser)
    .then(() => replace("/researchers"))
    .catch(() => replace("/"));
};

async function readUser() {
  const q = query(
    collection(db, "users"),
    where("email", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    NPC.alias = doc.data().alias;
    NPC.color = doc.data().color;
    NPC.logged_in = true;
    console.log("NPC: Data Fetched");
  });
}

export const logOut = () => {
  signOut(auth).then(() => {
    console.log("NPC: Signed Out");
    NPC.alias = undefined;
    NPC.color = undefined;
    NPC.logged_in = false;
    console.log("NPC: Data Erased");
    replace("/");
  });
};

export async function personColor(person) {
  const q = query(collection(db, "users"), where("alias", "==", person));
  const querySnapshot = await getDocs(q);
  let color;
  querySnapshot.forEach((doc) => {
    color = doc.data().color;
  });
  return color;
}

///////////////////////////NEW METHOD////////////////////////

export async function routeGuard(route) {
  return NPC.alias === route || admin_users.includes(NPC.alias);
}

export async function authUser() {
  console.log("AUTH: ", NPC.alias);
  return allowed_users.includes(NPC.alias);
}

export async function userName() {
  if (NPC.alias !== undefined) {
    return NPC.alias;
  }
  replace("/denied");
}
