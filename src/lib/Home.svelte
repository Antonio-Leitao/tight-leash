<script>
  import { LogIn } from "./firebase_config.js";
  import LucideIcon from "./LucideIcon.svelte";
  import NpLogo from "./NPLogo.svelte";
</script>

<div class="limiter">
  <div class="login">
    <NpLogo base_size={"3rem"} text_color={"var(--clr-gray-deep)"} />
  </div>

  <span>
    <button class="white" on:click={LogIn}>
      <LucideIcon name={"user"} />
      <p>{"Login"}</p>
    </button>

    <button class="white">
      <LucideIcon name={"info"} />
      <p>{"Learn more"}</p>
    </button>
  </span>
</div>

<style>
  .limiter {
    display: grid;
    place-items: center;
  }
  button {
    --background: #2b3044;
    --background-hover: #1e2235;
    width: fit-content;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.7rem 1rem 0.7rem 1rem;
    background-color: var(--background);
    color: var(--clr-background);
    transition: all 0.2 ease;
    border: none;
    border-radius: 0.4rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 9, 61, 0.2);
    margin: 0.2rem;
  }

  p {
    margin: 0 0 0 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }
  button:hover {
    background-color: var(--background-hover);
  }

  button:active {
    transform: scale(0.96);
  }

  .white {
    background-color: var(--clr-background);
    box-shadow: var(--long-stat-shadow);
    color: var(--background);
    padding: 0.55rem 0.85rem 0.55rem 0.85rem;
  }

  button.white:hover {
    box-shadow: var(--short-stat-shadow);
    background-color: var(--clr-background);
  }
  .login {
    width: 20rem;
    height: 20rem;
    border-radius: 0.5rem;
    background-color: var(--clr-background);
    box-shadow: var(--long-stat-shadow);
    margin-bottom: 1rem;
  }
  span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
