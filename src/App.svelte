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
    <div class="banner">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 476.69 107.13"
        ><defs
          ><style>
            .cls-4 {
              stroke: #000;
              stroke-miterlimit: 10;
              fill: none;
              stroke-width: 5.88px;
            }
          </style></defs
        ><text
          transform="translate(30.59 69)"
          style="stroke:#000;stroke-miterlimit:10;font-size:54.57px;stroke-width:3.12px;font-family:Helvetica-Bold,Helvetica;font-weight:700;letter-spacing:.07em"
          >NP<tspan x="83.45" y="0" style="letter-spacing:.05em">L</tspan></text
        ><text
          transform="translate(159.86 63.7)"
          style="font-size:38.98px;font-family:Helvetica-Light,Helvetica;font-weight:300;letter-spacing:.3em"
          >RESEARCH</text
        ><path
          class="cls-4"
          d="M39.42 104.19H2.94V2.94h36.48M437 2.94h36.75v101.25H437"
        /></svg
      >
    </div>
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
    margin-left: calc(100vw - 100%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
  }
  .banner {
    display: grid;
    place-items: center;
    margin-right: 0.2rem;
  }

  .banner svg {
    height: 2rem;
  }

  .wrapper {
    margin-top: 5rem;
    display: grid;
    place-items: center;
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  }
</style>
