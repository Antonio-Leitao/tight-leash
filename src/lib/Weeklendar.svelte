<script>
  export let researchers;
  import ResearcherSummary from "./ResearcherSummary.svelte";
</script>

<span>
  <h3>What are people</h3>
  <div class="tag">Doing</div>
</span>

<div class="work">
  {#each researchers as researcher}
    <ResearcherSummary {researcher} />
  {/each}
</div>

<style>
  .work {
    display: flex;
    flex-direction: column-reverse;
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 0.75rem;
  }

  .tag {
    border-radius: 0.3rem;
    font-size: 0.65rem;
    letter-spacing: 0.05rem;
    margin-left: 0.2rem;
    margin-right: 0.1rem;
    padding: 0.1rem 0.2rem 0.2rem 0.2rem;
    color: var(--clr-background);
    background-color: var(--clr-orange);
  }
</style>
