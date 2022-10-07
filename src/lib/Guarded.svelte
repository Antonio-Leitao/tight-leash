<script>
  import {
    prefixes,
    suffixes,
    userData,
    personColor,
  } from "./firebase_config.js";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import AddButton from "./AddButton.svelte";
  export let params;
  import Project from "./Project.svelte";

  let user = userData();

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
  const userRef = doc(db, "users", params.name);
  let projects = [];
  const unsub_projects = onSnapshot(userRef, (doc) => {
    projects = doc.data().projects;
  });

  const projectsRef = doc(db, "users", params.name);
  async function addProject(event) {
    let new_proj = event.detail.title;
    if (projects.includes(new_proj)) {
      new_proj =
        new_proj + suffixes[Math.floor(Math.random() * prefixes.length)];
    }
    if (projects.includes(new_proj)) {
      new_proj =
        prefixes[Math.floor(Math.random() * prefixes.length)] + new_proj;
    }

    await updateDoc(projectsRef, {
      projects: [new_proj, ...projects],
    });
  }

  async function renameProject(event) {
    let index = projects.indexOf(event.detail.project);
    projects[index] = event.detail.new_name;

    //update projects
    await updateDoc(projectsRef, {
      projects: projects,
    });

    //update tasks
    const q = query(tasksRef, where("project", "==", event.detail.project));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        project: event.detail.new_name,
      });
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
    query(tasksRef, orderBy("timestamp", "asc")),
    (querySnapshot) => {
      let fbTasks = [];
      querySnapshot.forEach((doc) => {
        fbTasks = [{ id: doc.id, ...doc.data() }, ...fbTasks];
        // fbTasks.push(doc.data());
      });
      tasks = fbTasks;
    }
  );

  async function addTask(event) {
    let task = {
      title: event.detail.title,
      description: event.detail.description,
      tag: event.detail.tag,
      week: event.detail.week, //fix this!
      project: event.detail.project,
      updated: (await user).alias,
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

  //////////UPDATE TASK//////////

  async function updateTask(event) {
    let taskRef = doc(tasksRef, event.detail.id);
    await updateDoc(taskRef, {
      [event.detail.field]: event.detail.value,
      updated: params.name,
      timestamp: serverTimestamp(),
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
  async function moveUp(event) {
    let index = projects.indexOf(event.detail.project);
    if (index === 0) {
      return;
    }
    projects = array_move(projects, index, index - 1);
    await updateDoc(userRef, {
      projects: projects,
    });
  }
  async function moveDown(event) {
    let index = projects.indexOf(event.detail.project);
    if (index === projects.length) {
      return;
    }

    projects = array_move(projects, index, index + 1);
    await updateDoc(userRef, {
      projects: projects,
    });
  }
</script>

{#await personColor(params.name) then user_color}
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
        on:rename={renameProject}
        on:update={updateTask}
      />
    </div>
  {/each}
{/await}
