<script>
  import { link } from "svelte-spa-router";
  import Weeklendar from "./Weeklendar.svelte";
  let user = "Giovanni";
  let researchers = [
    {
      first_name: "Marco",
      last_name: "Nurisso",
      alias: "Marco",
      image:
        "https://italian.news24viral.com/wp-content/uploads/2021/05/Dettagli-strazianti-su-Danny-DeVito.jpg",
      color: "orange",
    },
    {
      first_name: "António",
      last_name: "Leitão",
      alias: "Antonio",
      image: "static/avatar_leitao.png",
      color: "blue",
    },
    {
      first_name: "Simone",
      last_name: "Poetto",
      alias: "Simone",
      image: "static/Simone-poetto.jpg",
      color: "green",
    },
    {
      first_name: "Maxime",
      last_name: "Lucas",
      alias: "Maxime",
      image: "static/badder_max.jpg",
      color: "red",
    },
  ];
</script>

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

{#if user === "Giovanni"}
  <Weeklendar {researchers}/>
{/if}

<style>
  .researchers {
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
