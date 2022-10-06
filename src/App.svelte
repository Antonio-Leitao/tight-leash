<script>
  import Home from "./lib/Home.svelte";
  import Error from "./lib/Error.svelte";
  import Dashboard from "./lib/Dashboard.svelte";
  import Loading from "./lib/Loading.svelte";
  import Denied from "./lib/Denied.svelte";
  import Button from "./lib/Button.svelte";

  import { wrap } from "svelte-spa-router/wrap";
  import Router from "svelte-spa-router";
  import { replace, location } from "svelte-spa-router";
  import { getAuth, signOut } from "firebase/auth";
  import { app } from "./lib/firebase_config.js";

  ////////////FIREBASE STUFF//////////////////
  const logOut = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      replace("/");
    });
  };

  //need function to check if who is logged in is allowed

  //function to log out

  //function to get logged user data

  ///////////ROUTING//////////////
  const user = "Antonio";

  export const routes = {
    "/": Home,
    "/researchers": Dashboard,

    // This route has an async function as pre-condition
    "/researchers/:name": wrap({
      asyncComponent: () => import("./lib/Guarded.svelte"),

      conditions: [
        (detail) => {
          return detail.params.name === user;
        },
      ],
      loadingComponent: Loading,
    }),
    "/denied": Denied,
    "/*": Error,
  };

  function conditionsFailed() {
    replace("/denied");
  }
</script>

{#if $location !== "/"}
  <span>
    <div class="banner">NPL Research Lab</div>
    {#if $location !== "/researchers"}
      <Button
        clickFunction={() => replace("/researchers")}
        icon_name={"corner up left"}
        text={"Back"}
        white={true}
      />
    {/if}
    <Button
      clickFunction={logOut}
      icon_name={"user"}
      text={"Sign out"}
      white={true}
    />
  </span>
{/if}
<div class="wrapper">
  <Router {routes} on:conditionsFailed={conditionsFailed} />
</div>

<style>
  span {
    position: absolute;
    top: 4%;
    margin-right: calc(100vw - 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    left: 65vw;
  }

  .wrapper {
    margin-top: 5rem;
    display: grid;
    place-items: center;
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  }
</style>
