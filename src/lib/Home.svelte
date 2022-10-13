<script>
  import { LogIn } from "./firebase_config.js";
  import LucideIcon from "./LucideIcon.svelte";
</script>

<div class="limiter">
  <div class="login">
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
              stroke: currentColor;
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

    <div class="icon-row">
      <div class="main-icon">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 522.12 231.22"
          ><defs
            ><style>
              .cls-1 {
                fill: none;
                stroke-width: 20px;
                stroke: #000;
                stroke-miterlimit: 10;
              }
            </style></defs
          ><path
            class="cls-1"
            d="M18.79 106.77a28 28 0 0 1 39.6-39.59M17.38 105.36l118.79 118.79M56.97 65.76l99 99M195.45 124.68a28 28 0 0 1-39.6 39.6M78.19 7.78l117.38 117.38M194.86 106.07a28 28 0 0 0-39.6-39.6M196.27 104.65 77.48 223.45M156.68 65.05l-99 99M18.2 124a28 28 0 0 0 39.6 39.6M135.46 7.07 18.08 124.45"
          /><text
            transform="translate(262.39 165.06)"
            style="font-size:40px;font-family:Helvetica-Light,Helvetica;font-weight:300;letter-spacing:.4em"
            >LEASH</text
          ><text
            transform="translate(221.16 120.9)"
            style="font-size:80px;stroke-width:2px;font-family:Helvetica-Bold,Helvetica;font-weight:700;letter-spacing:.15em;stroke:#000;stroke-miterlimit:10"
            >TIGHT</text
          ></svg
        >
      </div>
    </div>

    <div class="button-row">
      <button class="white" on:click={LogIn}>
        <LucideIcon name={"user"} />
        <p>Sign in with Google</p>
      </button>
    </div>
  </div>
</div>

<style>
  .limiter {
    display: grid;
    place-items: center;
  }

  .login {
    position: absolute;
    top: 8%;
    width: 40vw;
    height: fit-content;
    border-radius: 0.5rem;
    background-color: var(--clr-background);
    box-shadow: var(--long-stat-shadow);
    margin-bottom: 1rem;
  }
  .back-icon {
    transform: translateX(50%);
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
  }
  .back-icon .cls-1 {
    stroke: var(--clr-gray);
  }

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60%;
    position: absolute;
    top: 10%;
  }

  .main-icon {
    width: 50%;
  }

  .button-row {
    position: absolute;
    top: 70%;
    width: 100%;
    display: grid;
    place-items: center;
  }

  button {
    --background: #2b3044;
    --background-hover: #1e2235;
    width: fit-content;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.7rem 1rem 0.7rem 1rem;
    background-color: var(--background);
    color: var(--clr-background);
    transition: all 0.2 ease;
    border: none;
    border-radius: 0.4rem;
    box-shadow: 0px 4px 8px 0px rgba(0, 9, 61, 0.2);
    margin: 0.2rem;
  }

  p {
    margin: 0 0 0 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }
  button:hover {
    background-color: var(--background-hover);
  }

  button:active {
    transform: scale(0.96);
  }

  .white {
    background-color: var(--clr-background);
    box-shadow: var(--long-stat-shadow);
    color: var(--background);
    padding: 0.55rem 0.85rem 0.55rem 0.85rem;
  }

  button.white:hover {
    box-shadow: var(--short-stat-shadow);
    background-color: var(--clr-background);
  }
</style>
