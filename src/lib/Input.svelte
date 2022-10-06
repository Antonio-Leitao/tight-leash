<script>
  export let label = "Ribbon Color";
  export let value;
  export let disabled = false;
  export let type = "one-line";
  let lens;
  export function focus() {
    lens.focus();
  }
  import { adaptiveGrowth } from "./scripts/adaptive_growth.js";
  import LucideIcon from "./LucideIcon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="input-group">
  {#if type === "area"}
    <textarea use:adaptiveGrowth bind:this={lens} bind:value />
  {:else if type === "one-line"}
    <input class="input" bind:value {disabled} />
  {:else}
    <div class="number-input" on:click={() => dispatch("week_touch")}>
      <div class="addOne" on:click={() => (value = value - 1)}>
        <LucideIcon name="minus" />
      </div>
      {value}
      <div class="addOne" on:click={() => (value = value + 1)}>
        <LucideIcon name="plus" />
      </div>
    </div>
  {/if}
  {#if type !== "number"}
    <label for={undefined} class="user-label">{label}</label>
  {/if}
</div>

<style>
  .input-group {
    position: relative;
    margin-top: 0.3rem;
  }
  input {
    line-height: 2.4rem;
    outline: none;
    font-size: 15px;
    color: var(--clr-text1);
    border-radius: 0.4rem;
    border: 2px solid var(--clr-gray);
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }
  input:focus {
    outline: none;
    border-radius: 0.4rem;
    border: 2px solid var(--user-color);
  }
  .input:focus ~ label {
    color: var(--user-color);
  }

  input:disabled {
    text-decoration: line-through;
    color: var(--clr-gray);
    opacity: 0.5;
  }

  .user-label {
    padding: 0 0.2rem 0 0.2rem;
    position: absolute;
    font-size: 0.75rem;
    left: 1rem;
    top: -0.5rem;
    background-color: var(--clr-background);
    color: var(--clr-text2);
    pointer-events: none;
    transition: 150ms ease;
  }

  textarea {
    background: none;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
    margin: 0 0 0.5rem 0;
    padding: 0;
    width: 100%;
    resize: none;
    font-size: 0.75rem;
    min-height: 5rem;
    border-radius: 0.4rem;
    color: var(--clr-text1);
    border: 2px solid var(--clr-gray);
    padding: 0.5rem;
  }
  textarea:focus {
    outline: none;
    border: 2px solid var(--user-color);
  }

  textarea:focus ~ label {
    color: var(--user-color);
  }
  .number-input {
    border-radius: 0.4rem;
    color: var(--clr-text1);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .addOne {
    color: var(--clr-gray);
    border-radius: 0.4rem;
    border: 2px solid var(--clr-gray);
    cursor: pointer;
    background-color: var(--clr-background);
    display: grid;
    place-items: center;
  }
  .addOne:hover {
    border: 2px solid var(--user-color);
    color: var(--user-color);
  }
</style>
