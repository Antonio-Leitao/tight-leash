<script>
  export let user_color = "orange";
  import LucideIcon from "./LucideIcon.svelte";
  import Modal from "./Modal.svelte";
  import Input from "./Input.svelte";
  let modal;
  let value;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function submit() {
    dispatch("new_project", {
      title: value,
    });
    modal.toggle();
    value = "";
  }
</script>

<div class="add" on:click={() => modal.toggle()}>
  <LucideIcon name={"plus"} />
</div>

<Modal bind:this={modal}>
  <div
    on:blur={() => (value = "")}
    style="--user-color:var(--clr-{user_color});"
  >
    <h2>New project</h2>
    <form on:submit|preventDefault={submit}>
      <Input type="one-line" label="Project name" bind:value />
    </form>
  </div>
</Modal>

<style>
  .add {
    cursor: pointer;
    background-color: var(--clr-background);
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    margin: 1.7rem;
  }

  .add:hover {
    background-color: var(--clr-gray);
  }
  form {
    display: flex;
    align-items: center;
  }

  h2 {
    color: var(--clr-text1);
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 1rem;
  }
</style>
