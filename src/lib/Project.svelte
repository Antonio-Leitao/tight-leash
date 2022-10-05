<script>
  export let user_color = "orange";
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

  import { slide, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ContextMenu from "./ContextMenu.svelte";
  import LucideIcon from "./LucideIcon.svelte";
  import Task from "./Task.svelte";
  import Button from "./Button.svelte";

  import Modal from "./Modal.svelte";
  let task_title = "";
  let task_description = "";
  let task_tag = "Pending";
  let modal;
  let inputRef;

  const switchFocus = () => {
    inputRef.focus();
  };

  function submit(event) {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log(task_title);
      modal.toggle();
      task_title = "";
      task_description = "";
      task_tag = "Pending";
    }
  }

  let expanded = false;

  function handleThing(event) {
    if (event.detail.thing === "Add Task") {
      modal.toggle();
    }
    console.log(event.detail.thing);
  }
</script>

<div
  class="folder"
  style="--user-color:var(--clr-{user_color})"
  class:toggled={expanded}
>
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
        <li
          in:fly={{
            delay: 50 * i,
            x: -200,
            opacity: 0,
            duration: 500,
            easing: quintOut,
          }}
        >
          <Task {...task} />
        </li>
      {/each}

      <div style="display:flex; align-items:center; justify-content:center;">
        <div class="close" on:click={() => (expanded = false)}>
          <LucideIcon name={"chevron up"} />
        </div>
      </div>
    </ul>
  {/if}
</div>

<Modal bind:this={modal}>
  <div on:keydown={submit}>
    <h2>New Task</h2>
    <div class="form" style="--user-color:var(--clr-{user_color}">
      <input placeholder="title" bind:value={task_title} />
      <textarea
        placeholder="Description"
        bind:this={inputRef}
        bind:value={task_description}
      />

      <div class="tags">
        {#each ["Pending", "Approved", "Doing", "Denied", "Complete"] as tag_name}
          <div
            class="tag {tag_name}"
            class:selected={task_tag === tag_name}
            on:click={() => (task_tag = tag_name)}
            on:click={switchFocus}
          >
            {tag_name}
          </div>
        {/each}
      </div>
    </div>
  </div>
</Modal>

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
    box-shadow: var(--hover-shadow);
  }
  .toggled {
    box-shadow: var(--hover-shadow);
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
    color: var(--user-color);
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

  .form {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  input {
    line-height: 2.4rem;
    outline: none;
    font-size: 15px;
    color: var(--clr-text1);
    border-radius: 0.4rem;
    border: 2px solid var(--clr-gray);
    margin-bottom: 0.5rem;
  }
  input:focus {
    outline: none;
    border-radius: 0.4rem;
    border: 2px solid var(--user-color);
  }
  h2 {
    color: var(--clr-text1);
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 1rem;
  }
  .tags {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tag {
    border-radius: 0.3rem;
    font-size: 0.65rem;
    letter-spacing: 0.05rem;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    color: var(--clr-background);
    background-color: var(--clr-gray-deep);
    margin-bottom: 0.5rem;
  }

  .tag.Pending {
    --tag-color: var(--clr-blue);
  }

  .tag.Approved {
    --tag-color: var(--clr-purple);
  }

  .tag.Doing {
    --tag-color: var(--clr-orange);
  }

  .tag.Denied {
    --tag-color: var(--clr-red);
  }
  .tag.Complete {
    --tag-color: var(--clr-green);
  }
  .tag:hover,
  .tag.selected {
    background-color: var(--tag-color);
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
    height: 5rem;
    border-radius: 0.4rem;
    color: var(--clr-text1);
    border: 2px solid var(--clr-gray);
  }
  textarea:focus {
    outline: 2px solid var(--user-color);
  }
</style>
