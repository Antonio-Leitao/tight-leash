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

  let tasks = [
    {
      title: "Something that I want to do",
      tag: "Pending",
      week: -1,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti
    porro iusto autem, expedita neque numquam nam sint repellendus corporis?
    Atque, iste amet reprehenderit odio cupiditate corrupti sequi totam dolor.`,
    },
    {
      title: "Something I will be able to do",
      tag: "Approved",
      week: 0,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti
    porro iusto autem, expedita neque numquam nam sint repellendus corporis?
    Atque, iste amet reprehenderit odio cupiditate corrupti sequi totam dolor.`,
    },
    {
      title: "Something That I am doing right now",
      tag: "Doing",
      week: 1,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti
    porro iusto autem, expedita neque numquam nam sint repellendus corporis?
    Atque, iste amet reprehenderit odio cupiditate corrupti sequi totam dolor.`,
    },
    {
      title: "Something I totally wont do",
      tag: "Denied",
      week: 2,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti
    porro iusto autem, expedita neque numquam nam sint repellendus corporis?
    Atque, iste amet reprehenderit odio cupiditate corrupti sequi totam dolor.`,
    },
    {
      title: "Something that I have done",
      tag: "Completed",
      week: 4,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deleniti
    porro iusto autem, expedita neque numquam nam sint repellendus corporis?
    Atque, iste amet reprehenderit odio cupiditate corrupti sequi totam dolor.`,
    },
  ];
  
  import { fly, fade } from "svelte/transition";
  import { quintOut, backIn } from "svelte/easing";
  import ContextMenu from "./ContextMenu.svelte";
  import Task from "./Task.svelte";
  let name = "Portfolio";
  let n_tasks = 10;
  let expanded = false;

  function handleThing(event){console.log(event.detail.thing)}
</script>

<div class="folder">
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
    {#each tasks as task, i}
      <div
        in:fly={{
          delay: 100 * i,
          x: -200,
          duration: 500,
          opacity: 0,
          easing: quintOut,
        }}
        out:fly={{
          delay: (n_tasks - i) * 20,
          x: -200,
          duration: 200,
          opacity: 0,
          easing: quintOut,
        }}
      >
        <Task {...task} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .folder {
    cursor: pointer;
    background: var(--clr-background);
    border-radius: 10px;
    overflow: hidden;
    width: clamp(300px, 450px, 450px);
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
</style>
