<script>
  export let researcher;

  import { markdownParser } from "./scripts/markdown_parser";
  import { db } from "./firebase_config.js";
  import { collection, onSnapshot, query, where } from "firebase/firestore";

  let tasks = [];
  const tasksRef = collection(db, `users/${researcher.alias}/tasks`);
  const unsubscribe = onSnapshot(
    query(tasksRef, where("tag", "==", "Doing")),
    (querySnapshot) => {
      let fbTasks = [];
      querySnapshot.forEach((doc) => {
        fbTasks = [{ id: doc.id, ...doc.data() }, ...fbTasks];
      });
      tasks = fbTasks;
    }
  );
</script>

{#if tasks.length > 0}
  <div class="task-row" style="--clr-border:var(--clr-{researcher.color});">
    <div
      class="person"
      style="--clr-border:var(--clr-{researcher.color});background-image: url({researcher.image});"
    />
    <div class="tasks">
      {#each tasks as task}
        <div class="task">
          <h3>{task.title}</h3>
          <p>
            {@html markdownParser(task.description)}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .task-row {
    display: flex;
    width: fit-content;
    height: fit-content;
    align-items: flex-start;
    justify-content: center;
  }
  .person {
    border: 0.3rem solid var(--clr-border);
    border-radius: 50%;
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    color: var(--clr-text1);
    height: 4rem;
    width: 4rem;
    background-position: center;
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: 130px;
    margin: 0.2rem;
  }
  .tasks {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 25rem;
    height: fit-content;
  }
  .task {
    padding: 0.8rem;
    background-color: var(--clr-border);
    border-radius: 0.5rem;
    margin-top: 0.1rem;
  }

  h3 {
    margin: 0;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
  }
  p {
    color: #000;
    font-size: 0.75rem;
    --lh: 1rem;
    line-height: var(--lh);
    margin: 0;
    margin-top: 0.3rem;
    max-height: calc(10 * var(--lh));
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 10;
  }
  p :global(h1) {
    margin: 0;
    font-size: 0.9rem;
  }
  p :global(h2) {
    margin: 0;
    font-size: 0.8rem;
  }
  p :global(h3) {
    margin: 0;
    font-size: 0.75rem;
  }
  p :global(h4) {
    margin: 0;
    font-size: 0.7rem;
  }
</style>
