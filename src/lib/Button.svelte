<script>
  import LucideIcon from "./LucideIcon.svelte";
  export let text = "Sign out";
  export let icon_name = "user";
  export let white = false;
  export let clickFunction;
</script>

<button class:white on:click={clickFunction}>
  <LucideIcon name={icon_name} />
  <p>{text}</p>
</button>

<style>
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
    box-shadow: none;
    color: var(--background);
    padding: 0.55rem 0.85rem 0.55rem 0.85rem;
  }

  button.white:hover {
    box-shadow: var(--hover-shadow);
    background-color: var(--clr-background);
  }
</style>
