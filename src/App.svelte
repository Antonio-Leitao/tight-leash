<script>
  import Router from "svelte-spa-router";

  import { link, replace } from "svelte-spa-router";
  import { routes } from "./routes.js";

  function conditionsFailed(event) {
    replace("/denied");
  }
</script>

<body>
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
</body>

<style>
  .wrapper {
    top: 5%;
    display: grid;
    place-items: center;
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  }
</style>
