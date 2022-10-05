<script>
  import { replace } from "svelte-spa-router";
  import Button from "./Button.svelte";
</script>

<span>
  <Button
    clickFunction={() => replace("/researchers")}
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
