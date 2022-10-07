<script>
  export let background_color = "var(--clr-background)";
  export let text_color = "var(--clr-text1)";
  export let base_size = "2rem";
</script>

<div class="outer" style="--base-size:{base_size};--logo-text:{text_color};">
  <div class="inner" style="background-color:{background_color};">
    <div class="title">NPL</div>
    <div class="paragraph">RESEARCH</div>
  </div>
</div>

<style>
  .outer {
    --border-size: calc(var(--base-size) / 9);
    display: grid;
    place-items: center;
    border: var(--border-size) solid var(--logo-text);
    width: fit-content;
    padding-left: calc(var(--base-size) / 4);
    padding-right: calc(var(--base-size) / 4);
  }

  .inner {
    width: fit-content;
    display: grid;
    place-items: center;
    padding: calc(var(--base-size) / 4.5);
    background-color: var(--clr-green);
    height: calc(100% + calc(2 * var(--border-size)));
  }

  .title {
    text-align: center;
    font-size: var(--base-size);
    font-weight: 1000;
    letter-spacing: calc(var(--base-size) / 12);
    color: var(--logo-text);
    text-transform: uppercase;
    font-family: "Helvetica", "Arial", sans-serif;
  }

  .paragraph {
    font-size: calc(var(--base-size) / 4);
    font-weight: 100;
    text-align: center;
    letter-spacing: calc(var(--base-size) / 10);
    color: var(--logo-text);
    text-transform: uppercase;
    font-family: "Helvetica", "Arial", sans-serif;
  }
</style>
