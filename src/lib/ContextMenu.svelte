<script>
  import LucideIcon from "./LucideIcon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let menuItems;
  let scroll_amount;

  import { clickOutside } from "./scripts/click_outside.js";
  // pos is cursor position when right click occur
  let pos = { x: 0, y: 0 };
  // menu is dimension (height and width) of context menu
  let menu = { h: 0, w: 0 };
  // browser/window dimension (height and width)
  let browser = { h: 0, w: 0 };
  // showMenu is state of context-menu visibility
  let showMenu = false;

  function rightClickContextMenu(e) {
    showMenu = true;
    browser = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    pos = {
      x: e.clientX,
      y: e.clientY + scroll_amount,
    };
    if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
    if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
  }

  function getContextMenuDimension(node) {
    // This function will get context menu dimension
    // when navigation is shown => showMenu = true
    let height = node.offsetHeight;
    let width = node.offsetWidth;
    menu = {
      h: height,
      w: width,
    };
  }

  function doThing(thing) {
    dispatch("doThing", {
      thing: thing,
    });
    showMenu = false;
  }
</script>

<svelte:window bind:scrollY={scroll_amount} />

{#if showMenu}
  <nav
    use:getContextMenuDimension
    use:clickOutside
    on:click_outside={() => (showMenu = false)}
    style="position: absolute; top:{pos.y}px; left:{pos.x}px"
  >
    <div class="navbar" id="navbar">
      <ul>
        {#each menuItems as item}
          {#if item.name == "hr"}
            <hr />
          {:else if item.color === undefined}
            <div
              on:click={() => doThing(item.displayText)}
              class="list-item"
              style="--hover-color: var(--clr-text1);"
            >
              <LucideIcon name={item.name} size="20" />
              <div class="icon-text">{item.displayText}</div>
            </div>
          {:else}
            <div
              on:click={() => doThing(item.displayText)}
              class="list-item"
              style="--hover-color:{item.color}"
            >
              <LucideIcon name={item.name} size="20" />
              <div class="icon-text">{item.displayText}</div>
            </div>
          {/if}
        {/each}
      </ul>
    </div>
  </nav>
{/if}

<div on:click={rightClickContextMenu}>
  <slot />
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .navbar {
    display: inline-flex;
    width: 210px;
    background-color: var(--clr-background);
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    box-shadow: var(--short-stat-shadow);
  }
  .navbar ul {
    margin: 0.5rem;
  }
  .list-item {
    color: var(--clr-gray-deeper);
    display: flex;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.4rem;
  }
  .icon-text {
    margin-left: 1rem;
  }

  .list-item:hover {
    color: var(--hover-color);
    background-color: var(--clr-gray);
  }

  hr {
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 5px 0px;
  }
</style>
