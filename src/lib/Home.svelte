<script>
  import Button from "./Button.svelte";
  import { LogIn } from "./firebase_config.js";
</script>

<span>
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
