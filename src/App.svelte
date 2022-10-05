<script>
  import Router from "svelte-spa-router";
  import Button from "./lib/Button.svelte";

  import { replace, location } from "svelte-spa-router";
  import { routes } from "./routes.js";

  function conditionsFailed(event) {
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
      clickFunction={() => replace("/")}
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
