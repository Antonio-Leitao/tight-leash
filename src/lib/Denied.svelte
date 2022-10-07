<script>
  import Button from "./Button.svelte";
  import { LogIn } from "./firebase_config.js";
  import { replace } from "svelte-spa-router";
</script>

<h2>You do not have permission or are no longer singed in.</h2>
<span>
  <Button
    clickFunction={() => replace("/researchers")}
    icon_name={"corner up left"}
    text={"Back"}
    white={true}
  />
  <Button
    clickFunction={LogIn}
    icon_name={"user"}
    text={"Sign in with Google"}
    white={true}
  />
</span>

<style>
  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
