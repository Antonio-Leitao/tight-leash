<script>
  export let researchers;
</script>

<span>
  <h3>What are people</h3>
  <div class="tag">Doing</div>
</span>

<div class="work">
  {#each researchers as researcher}
    <div class="task-row" style="--clr-border:var(--clr-{researcher.color});">
      <div
        class="person"
        style="--clr-border:var(--clr-{researcher.color});background-image: url({researcher.image});"
      />
      <div class="tasks">
        {#each { length: 2 } as task}
          <div class="task">
            <h3>This is the summary of the task.</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatem, reprehenderit. Rem ex voluptatum vitae quibusdam nobis
              natus recusandae, eveniet, a ut quas libero illo laboriosam
              laudantium dolores consequuntur iure voluptas.
            </p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .work {
    display: flex;
    flex-direction: column-reverse;
  }
  .task-row {
    display: flex;
    width: fit-content;
    height: fit-content;
    align-items: flex-start;
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
    height: 4rem;
    width: 4rem;
    background-position: center;
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: 130px;
    margin: 0.2rem;
  }
  .tasks {
    margin-left: 1rem;
    margin-right: 1rem;
    width: 25rem;
    height: fit-content;
  }
  .task {
    padding: 0.8rem;
    background-color: var(--clr-border);
    border-radius: 0.5rem;
    margin-top: 0.1rem;
  }

  h3 {
    margin: 0;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
  }
  p {
    color: #000;
    font-size: 0.75rem;
    --lh: 1rem;
    line-height: var(--lh);
    margin: 0;
    margin-top: 0.3rem;
    max-height: calc(3 * var(--lh));
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
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
