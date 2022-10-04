<script>
  export let params;
  import Project from "./Project.svelte";
  import LucideIcon from "./LucideIcon.svelte";
  import { db } from "./firebase_config.js";

  //get all projects
  let projects = [];
  import { collection, doc, onSnapshot } from "firebase/firestore";
  const unsub = onSnapshot(doc(db, "users", params.name), (doc) => {
    projects = doc.data().projects;
  });

  //get tasks of each project
  const tasks = [];
  let query_string = `users/${params.name}/${projects[0]}`;
  console.log(projects);
  const q = collection(db, "users/Antonio/Portfolio");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tasks.push(doc.data());
    });
  });
  console.log(tasks.length);
</script>

<h1>
  This is the {params.name} blog!
</h1>

<div class="add">
  <LucideIcon name={"plus"} />
</div>
{#each projects as project}
  <Project name={project} {tasks} n_tasks={tasks.length}/>
{/each}

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
</style>
