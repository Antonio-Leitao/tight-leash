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
  export let completed_tasks = 2;
  let lens;

  import { slide, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import ContextMenu from "./ContextMenu.svelte";
  import LucideIcon from "./LucideIcon.svelte";
  import Task from "./Task.svelte";
  import Input from "./Input.svelte";

  import Modal from "./Modal.svelte";
  let task_title = "";
  let task_description = "";
  let task_tag = "Pending";
  let task_week = 2;
  let modal;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function addTask(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      dispatch("new_task", {
        title: task_title,
        description: task_description,
        tag: task_tag,
        project: name,
        week: task_week,
      });
      task_title = "";
      task_description = "";
      task_tag = "Pending";
      task_week = 2;
      modal.toggle();
    }
  }

  let expanded = false;

  function handleThing(event) {
    if (event.detail.thing === "Add Task") {
      modal.toggle();
    }
    if (event.detail.thing === "Move Up") {
      dispatch("move_up", {
        project: name,
      });
    }
    if (event.detail.thing === "Move Down") {
      dispatch("move_down", {
        project: name,
      });
    }
    if (event.detail.thing === "Clear Completed") {
      dispatch("clear_completed", {
        project: name,
      });
    }
    if (event.detail.thing === "Delete Project") {
      dispatch("delete_project", {
        project: name,
      });
    }
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
        {#if !expanded}
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
          <div class="circle">{n_tasks}</div>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
            stroke="currentColor"
            ><path
              d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"
            /></svg
          >
        {/if}
      </div>
      <div class="name">
        <div class="title">{name}</div>
        <div class="description">
          Completed tasks: {completed_tasks}/{n_tasks}
        </div>
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
      {#each tasks as task, i (task.id)}
        <li
          animate:flip={{ duration: 300 }}
          in:fly={{
            delay: 50 * i,
            x: -200,
            opacity: 0,
            duration: 500,
            easing: quintOut,
          }}
        >
          <Task
            title={task.title}
            updated={task.updated}
            description={task.description}
            tag={task.tag}
            week={task.week}
          />
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
  <div on:keydown={addTask} style="--user-color:var(--clr-{user_color}">
    <h2>New task</h2>

    <div class="form">
      <Input label="title" bind:value={task_title} type="one-line" />
      <Input
        bind:this={lens}
        label="description"
        bind:value={task_description}
        type="area"
      />
      <div class="tags">
        {#each ["Pending", "Approved", "Doing", "Denied", "Completed"] as tag_name}
          <div
            class="tag {tag_name}"
            class:selected={task_tag === tag_name}
            on:click={() => (task_tag = tag_name)}
            on:click={() => lens.focus()}
          >
            {tag_name}
          </div>
        {/each}
      </div>
      <div class="scope">
        <div class="description">Select time frame for task:</div>
        <div class="number">
          <Input
            type="number"
            label="weeks"
            bind:value={task_week}
            on:week_touch={() => lens.focus()}
          />
        </div>
        <div class="description">weeks</div>
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
    display: grid;
    place-items: center;
    color: var(--user-color);
    margin-right: 1rem;
  }

  .circle {
    position: absolute;
    color: var(--clr-background);
    transform: translateY(0.1rem);
    font-size: 0.8rem;
    text-align: center;
  }

  svg {
    width: 2rem;
    transition: all 0.2s ease-out;
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
  h2 {
    color: var(--clr-text1);
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .week {
    width: 20%;
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
  .tag.Completed {
    --tag-color: var(--clr-green);
  }
  .tag:hover,
  .tag.selected {
    background-color: var(--tag-color);
  }

  .scope {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .number {
    width: 30%;
  }
</style>
