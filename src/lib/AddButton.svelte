<script>
  export let user_color = "orange";
  import LucideIcon from "./LucideIcon.svelte";
  import Modal from "./Modal.svelte";
  let modal;
  let value;

  function submit() {
    console.log(value);
    modal.toggle();
    value = "";
  }
</script>

<div class="add" on:click={() => modal.toggle()}>
  <LucideIcon name={"plus"} />
</div>

<Modal bind:this={modal}>
  <h2>Insert Project Name</h2>
  <form on:submit|preventDefault={submit}>
    <input
      placeholder="Beatles lost album ideas"
      bind:value
      on:blur={() => (value = "")}
      style="--user-color:var(--clr-{user_color});"
    />
  </form>
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
  input {
    line-height: 2.4rem;
    outline: none;
    font-size: 15px;
    color: var(--clr-text1);
    border-radius: 0.4rem;
    border: 2px solid var(--clr-gray);
    width: 90%;
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
</style>
