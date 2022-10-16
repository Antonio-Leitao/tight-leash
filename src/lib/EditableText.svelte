<script>
  import { adaptiveGrowth } from "./scripts/adaptive_growth.js";
  export let field;
  export let value;

  let editable = false;
  import { clickOutside } from "./scripts/click_outside.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { markdownParser } from "./scripts/markdown_parser";

  import { onMount } from "svelte";
  $: htmlvalue = markdownParser(value);
  onMount(() => {
    htmlvalue = markdownParser(value);
  });

  function submit() {
    editable = false;
    dispatch("update", {
      field: field,
      value: value,
    });
  }

  function handleKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      submit();
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
    integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
    crossorigin="anonymous"
  />
</svelte:head>

<div on:dblclick={() => (editable = true)} class="wrapper">
  {#if editable}
    <textarea
      autofocus={editable}
      use:adaptiveGrowth
      bind:value
      use:clickOutside
      on:click_outside={submit}
      on:keydown={handleKeydown}
    />
  {:else}
    <div class="display">
      {@html htmlvalue}
    </div>
  {/if}
</div>

<style>
  textarea {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
    margin: 0;
    padding: 0.2rem;
    width: 100%;
    resize: none;
    border-radius: 0.35rem;
    height: 1rem;
  }

  textarea:focus {
    outline: 2px solid var(--clr-gray);
  }

  .display :global(h1) {
    margin: 0;
    font-size: 0.9rem;
  }

  .display :global(br) {
    display: block;
    content: "";
    margin-top: 0;
  }

  .display :global(br + br) {
    display: block;
    content: "";
    margin-top: 0.5rem;
  }

  .display :global(h1 + br) {
    display: block;
    content: "";
    margin-top: 0.5rem;
  }
  .display :global(.katex span) {
    font-family: "Times New Roman", serif;
  }
</style>
