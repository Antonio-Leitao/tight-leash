<script>
  import { link } from "svelte-spa-router";
  import Weeklendar from "./Weeklendar.svelte";
  import { db } from "./firebase_config.js";
  import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
  import { userName, admin_users } from "./firebase_config.js";
  const user = userName();

  let researchers = [];
  const tasksRef = collection(db, `users/`);
  const unsubscribe = onSnapshot(
    query(tasksRef, orderBy("seniority", "asc")),
    (querySnapshot) => {
      let fbRes = [];
      querySnapshot.forEach((doc) => {
        fbRes = [doc.data(), ...fbRes];
      });
      researchers = fbRes;
    }
  );

  //
  //   first_name: "Marco",
  //   last_name: "Nurisso",
  //   alias: "Marco",
  //   image:
  //     "https://italian.news24viral.com/wp-content/uploads/2021/05/Dettagli-strazianti-su-Danny-DeVito.jpg",
  //   color: "orange",
  // },
</script>

<div class="bigger-container">
  <div class="back-icon">
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 193.17 209.06"
      ><defs
        ><style>
          .cls-1 {
            fill: none;
            stroke: #000;
            stroke-miterlimit: 10;
            stroke-width: 18.08px;
          }
        </style></defs
      ><path
        class="cls-1"
        d="M17 96.54a25.31 25.31 0 0 1 35.8-35.8M15.71 95.26l107.41 107.41M51.51 59.46l89.51 89.5M176.72 112.73a25.32 25.32 0 0 1-35.81 35.8M70.69 7.03l106.13 106.13M176.18 95.9a25.31 25.31 0 1 0-35.8-35.8M177.46 94.62 70.05 202.03M141.66 58.82l-89.51 89.5M16.46 112.09a25.31 25.31 0 1 0 35.8 35.8M122.48 6.39 16.35 112.52"
      /></svg
    >
  </div>

  <div class="researchers">
    {#each researchers as researcher, i}
      <div class="card">
        <a href="/researchers/{researcher.alias}" use:link>
          <div class="content">
            <div
              class="person"
              style="--clr-border:var(--clr-{researcher.color});background-image: url({researcher.image});"
            />
            <div class="first_name">{researcher.first_name}</div>
            <div class="last_name">{researcher.last_name}</div>
          </div>
        </a>
      </div>
    {/each}
  </div>
</div>

{#await user}
  <p>...waiting</p>
{:then user}
  {#if admin_users.includes(user)}
    <Weeklendar {researchers} />
  {/if}
{/await}

<style>
  .bigger-container {
    position: relative;
    display: grid;
    place-items: center;
  }
  .back-icon {
    top: 10%;
    width: 35vw;
    z-index: -2;
  }
  .back-icon .cls-1 {
    stroke: var(--clr-gray);
  }
  .researchers {
    position: absolute;
    display: flex;
    padding: 3rem;
  }
  .card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 190px;
    height: 228px;
    padding: 1.3rem;
    background: var(--clr-background);
    border-radius: 0.4rem;
    box-shadow: -0.3em 0.3em 0.7em #00000015;
    transition: all 0.2s ease;
  }

  .card:hover {
    transform: translateY(-1rem);
  }
  .card:hover ~ .card {
    transform: translateX(100px);
  }
  .card:not(:first-child) {
    margin-left: -100px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    height: 7rem;
    width: 7rem;
    background-position: center;
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: 250px;
    margin: 1rem;
  }
  .first_name {
    color: var(--clr-text1);
    font-size: 20px;
    font-weight: 500;
  }

  .last_name {
    font-size: 15px;
    color: var(--clr-text2);
  }
  a:link {
    text-decoration: inherit;
    color: inherit;
  }

  a:visited {
    text-decoration: inherit;
    color: inherit;
  }
</style>
