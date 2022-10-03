<script>
  import { adaptiveGrowth } from "./scripts/adaptive_growth.js";
  export let value = "world";
  let editable = false;
  import { clickOutside } from "./scripts/click_outside.js";

  const ref_regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;

  const markdownParser = (text) => {
    const toHTML = text
      .replace(/^### (.*$)/gim, "<h3>$1</h3>") // h3 tag
      .replace(/^## (.*$)/gim, "<h2>$1</h2>") // h2 tag
      .replace(/^# (.*$)/gim, "<h1>$1</h1>") // h1 tag
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold text
      .replace(/\_\_(.*)\_\_/gim, "<b>$1</b>")
      .replace(/\*(.*)\*/gim, "<i>$1</i>") // italic text
      .replace(/\_(.*)\_/gim, "<i>$1</i>")
      .replace(/\n/gim, "<br>")
      .replace(ref_regex, "<a href=$2>$1</a>");
    return toHTML.trim(); // using trim method to remove whitespace
  };
  function submit() {
    editable = false;
    value = markdownParser(value);
    console.log(value);
  }

  function handleKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      submit();
    }
  }
</script>

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
    <div>
      {@html value}
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
    padding: 0;
    width: 100%;
    resize: none;
    border-radius: 0.35rem;
  }

  textarea:focus {
    outline: 2px solid var(--clr-gray);
  }
</style>
