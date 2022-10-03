<script>
  import Router from "svelte-spa-router";

  import { link, replace, location } from "svelte-spa-router";
  import { routes } from "./routes.js";

  function conditionsFailed(event) {
    replace("/error");
  }

  //FIREBASE

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";


  // Your web app's Firebase configuration
  import { firebaseConfig } from "./lib/firebase_config.js";
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //initialize firestore
  const db = getFirestore(app);

  //FIREBASE
</script>

<h2>Basic routing</h2>
<h3>{$location}</h3>

<!-- Navigation links -->
<ul>
  <li><a href="/" use:link>Home</a></li>
  <li><a href="/researchers" use:link>Dashboard</a></li>
  <li><a href="/researchers/Antonio" use:link>Guarded</a></li>
</ul>

<!-- Show the router -->
<div class="wrapper">
  <Router {routes} on:conditionsFailed={conditionsFailed} />
</div>

<style>
  .wrapper {
    display: grid;
    place-items: center;
    top: 10%;
  }
</style>
