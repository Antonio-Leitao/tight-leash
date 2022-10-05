<script>
  import { scale, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { clickOutside } from "./scripts/click_outside";

  export let blurred = false;
  export let shown = false;
  export function toggle() {
    shown = !shown;
  }
</script>

{#if shown}
  <div
    class="backdrop"
    class:blurred
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <div
      use:clickOutside
      on:click_outside={() => toggle()}
      in:scale={{ start: 0.5, duration: 200, easing: cubicOut }}
      class="modal"
    >
      <button on:click={() => toggle()} class="x">❌</button>
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 998;
  }
  .blurred {
    background-color: transparent;
    filter: blur(10px);
  }

  .modal {
    padding: 1.5rem;
    max-width: 50ch;
    border-radius: 1.5rem;
    background: #ffffff;
    border-radius: 0.5em;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
  .x {
    cursor: pointer;
    float: right;
    filter: grayscale(1);
    border: none;
    background: none;
    transition: transform 0.3 ease;
    z-index: 999;
  }
  .x:hover {
    transform: scale(1.2);
  }
</style>
