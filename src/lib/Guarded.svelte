<script>
  import AddButton from "./AddButton.svelte";
  export let params;
  import Project from "./Project.svelte";

  let user_color = "purple";

  //FIREBASE
  import { db } from "./firebase_config.js";
  import { collection, doc, onSnapshot } from "firebase/firestore";
  //get all projects
  let projects = [];
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
  //FIREBASE
</script>

<AddButton {user_color} />
{#each projects as project}
  <Project {user_color} name={project} {tasks} n_tasks={tasks.length} />
{/each}
