<script>
  import AddButton from "./AddButton.svelte";
  export let params;
  import Project from "./Project.svelte";

  let user_color = "blue";

  //FIREBASE
  import { db } from "./firebase_config.js";
  import {
    collection,
    updateDoc,
    doc,
    onSnapshot,
    setDoc,
    query,
    where,
    getDocs,
    deleteDoc,
  } from "firebase/firestore";

  //////////PROJECTS /////////////////
  let projects = [];
  const unsub_projects = onSnapshot(doc(db, "users", params.name), (doc) => {
    projects = doc.data().projects;
  });

  const projectsRef = doc(db, "users", params.name);
  async function addProject(event) {
    await updateDoc(projectsRef, {
      projects: [event.detail.title, ...projects],
    });
  }

  async function deleteProject(event) {
    cleanProject(event.detail.project);
    await updateDoc(projectsRef, {
      projects: projects.filter((element) => element !== event.detail.project),
    });
  }

  //////////TASKS /////////////////
  let tasks = [];
  const tasksRef = collection(db, `users/${params.name}/tasks`);
  const unsubscribe = onSnapshot(tasksRef, (querySnapshot) => {
    let fbTasks = [];
    querySnapshot.forEach((doc) => {
      fbTasks.push(doc.data());
    });
    tasks = fbTasks;
  });

  async function addTask(event) {
    let task = {
      title: event.detail.title,
      description: event.detail.description,
      tag: event.detail.tag,
      week: 1, //fix this!
      project: event.detail.project,
      updated: params.name,
      //add timestamp
    };
    await setDoc(doc(tasksRef), task);
  }

  async function cleanProject(project) {
    const q = query(tasksRef, where("project", "==", project));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  async function clearCompleted(event) {
    const q = query(
      tasksRef,
      where("project", "==", event.detail.project),
      where("tag", "==", "Completed")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
</script>

<AddButton {user_color} on:new_project={addProject} />

{#each projects as project}
  <Project
    {user_color}
    name={project}
    tasks={tasks.filter((task) => task.project === project)}
    n_tasks={tasks.filter((task) => task.project === project).length}
    completed_tasks={tasks.filter(
      (task) => task.tag === "Completed" && task.project === project
    ).length}
    on:new_task={addTask}
    on:delete_project={deleteProject}
    on:clear_completed={clearCompleted}
  />
{/each}
