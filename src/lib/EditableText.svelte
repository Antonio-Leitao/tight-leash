<script>
  import { adaptiveGrowth } from "./scripts/adaptive_growth.js";
  export let field;
  export let value;

  let editable = false;
  import { clickOutside } from "./scripts/click_outside.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import katex from "katex";

  function latex(math, inline = false) {
    let options = {
      displayMode: !inline,
      throwOnError: false,
    };
    return katex.renderToString(math, options);
  }

  const markdownParser = (text) => {
    const toHTML = text
      .replace(/^#### (.*$)/gim, "<h4>$1</h4>") // h3 tag
      .replace(/^### (.*$)/gim, "<h3>$1</h3>") // h3 tag
      .replace(/^## (.*$)/gim, "<h2>$1</h2>") // h2 tag
      .replace(/^# (.*$)/gim, "<h1>$1</h1>") // h1 tag
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold text
      .replace(/\_\_(.*)\_\_/gim, "<i>$1</i>")
      .replace(/\n/gim, "<br>")
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/, "<a href=$2>$1</a>")
      .replace(/\\begin{inline}(.*)\\end{inline}/, (a, b) => latex(b, true))
      .replace(/\\begin{equation}(.*)\\end{equation}/, (a, b) =>
        latex(b, false)
      );
    return toHTML.trim(); // using trim method to remove whitespace
  };

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
  .display :global(h2) {
    margin: 0;
    font-size: 0.8rem;
  }
  .display :global(h3) {
    margin: 0;
    font-size: 0.75rem;
  }
  .display :global(h4) {
    margin: 0;
    font-size: 0.7rem;
  }
</style>
