<script>
  let menuItems = [
    {
      name: "plus",
      displayText: "Add Task",
    },
    {
      name: "chevron up",
      displayText: "Move Up",
    },
    {
      name: "chevron down",
      displayText: "Move Down",
    },
    {
      name: "check square",
      displayText: "Clear Completed",
    },
    {
      name: "hr",
    },
    {
      name: "trash",
      color: "red",
      displayText: "Delete Project",
    },
  ];

  export let tasks;
  export let name = "Portfolio";
  export let n_tasks = 10;

  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ContextMenu from "./ContextMenu.svelte";
  import LucideIcon from "./LucideIcon.svelte";
  import Task from "./Task.svelte";

  let expanded = false;

  function handleThing(event) {
    console.log(event.detail.thing);
  }
</script>

<div class="folder" class:toggled={expanded}>
  <div class="details" class:expanded>
    <div class="summary" on:click={() => (expanded = !expanded)}>
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-folder"
        >
          <path
            d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
          />
        </svg>
      </div>
      <div class="name">
        <div class="title">{name}</div>
        <div class="description">Number of tasks: {n_tasks}</div>
      </div>
    </div>
    <div class="context-menu">
      <ContextMenu {menuItems} on:doThing={handleThing}>
        <div class="elipsis">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
            /></svg
          >
        </div>
      </ContextMenu>
    </div>
  </div>
  {#if expanded}
    <ul transition:slide={{ duration: 170 * tasks.length, easing: quintOut }}>
      {#each tasks as task, i}
        <li><Task {...task} /></li>
      {/each}

      <div style="display:flex; align-items:center; justify-content:center;">
        <div class="close" on:click={() => (expanded = false)}>
          <LucideIcon name={"chevron up"} />
        </div>
      </div>
    </ul>
  {/if}
</div>

<style>
  .folder {
    cursor: pointer;
    background: var(--clr-background);
    border-radius: 10px;
    overflow: hidden;
    width: clamp(300px, 450px, 450px);
    margin-bottom: 1rem;
  }
  .folder:hover {
    box-shadow: var(--long-stat-shadow);
  }
  .toggled {
    box-shadow: var(--long-stat-shadow);
  }
  .details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
    padding: 1rem;
    border: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .expanded {
    border-bottom: 2px solid var(--clr-gray);
  }

  .logo {
    display: flex;
    align-items: center;
    color: var(--clr-blue);
    grid-area: logo;
    margin-right: 0.5rem;
  }

  .summary {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .title {
    color: var(--clr-text1);
    font-size: 20px;
    font-weight: 500;
  }

  .description {
    font-size: 15px;
    color: var(--clr-text2);
  }

  .context-menu {
    cursor: pointer;
    fill: var(--clr-gray-deep);
  }

  .close {
    cursor: pointer;
    background-color: var(--clr-background);
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    margin: 1.7rem;
  }

  .close:hover {
    background-color: var(--clr-gray);
  }
</style>
