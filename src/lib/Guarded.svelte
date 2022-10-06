<script>
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import AddButton from "./AddButton.svelte";
  export let params;
  import Project from "./Project.svelte";
  const prefixes = [
    "New ",
    "Improved ",
    "A better ",
    "Second try on ",
    "Repeated ",
    "Revamped ",
    "Upgraded ",
    "Enhanced ",
    "Refined ",
    "Boosted ",
    "Polished ",
  ];
  const suffixes = [
    "v0.1",
    " beta",
    ".com",
    ".Inc",
    "(patent pending)",
    "v0.01",
    "v2.0",
    " alpha",
    "pre-release",
  ];

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
    serverTimestamp,
    orderBy,
  } from "firebase/firestore";

  //////////PROJECTS /////////////////
  let projects = [];
  const unsub_projects = onSnapshot(doc(db, "users", params.name), (doc) => {
    projects = doc.data().projects;
  });

  const projectsRef = doc(db, "users", params.name);
  async function addProject(event) {
    let new_proj = event.detail.title;
    if (projects.includes(new_proj)) {
      new_proj =
        prefixes[Math.floor(Math.random() * prefixes.length)] + new_proj;
    }

    if (projects.includes(new_proj)) {
      new_proj =
        new_proj + suffixes[Math.floor(Math.random() * prefixes.length)];
    }

    await updateDoc(projectsRef, {
      projects: [new_proj, ...projects],
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
  const unsubscribe = onSnapshot(
    query(tasksRef, orderBy("timestamp", "desc")),
    (querySnapshot) => {
      let fbTasks = [];
      querySnapshot.forEach((doc) => {
        fbTasks.push(doc.data());
      });
      tasks = fbTasks;
    }
  );

  async function addTask(event) {
    let task = {
      title: event.detail.title,
      description: event.detail.description,
      tag: event.detail.tag,
      week: 1, //fix this!
      project: event.detail.project,
      updated: params.name,
      timestamp: serverTimestamp(),
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

  /////////////// MOVEMENT ////////////////
  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }
  function moveUp(event) {
    let index = projects.indexOf(event.detail.project);
    if (index === 0) {
      return;
    }
    projects = array_move(projects, index, index - 1);
  }
  function moveDown(event) {
    let index = projects.indexOf(event.detail.project);
    if (index === projects.length) {
      return;
    }
    projects = array_move(projects, index, index + 1);
  }
</script>

<AddButton {user_color} on:new_project={addProject} />

{#each projects as project, i (project)}
  <div animate:flip={{ duration: 300, easing: quintOut }}>
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
      on:move_up={moveUp}
      on:move_down={moveDown}
    />
  </div>
{/each}
