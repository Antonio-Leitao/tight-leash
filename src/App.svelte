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

  ////////////AUTH STUFF//////////////////

  import { logOut, authUser, routeGuard } from "./lib/firebase_config.js";

  ///////////ROUTING//////////////

  export const routes = {
    "/": Home,
    "/researchers": wrap({
      component: Dashboard,
      conditions: [authUser],
      loadingComponent: Loading,
    }),

    // This route has an async function as pre-condition
    "/researchers/:name/": wrap({
      asyncComponent: () => import("./lib/Guarded.svelte"),
      conditions: [(detail) => routeGuard(detail.params.name)],
      loadingComponent: Loading,
    }),
    "/denied": Denied,
    "/*": Error,
  };

  function conditionsFailed() {
    replace("/denied");
  }
</script>

{#if !["/", "/denied"].includes($location)}
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
