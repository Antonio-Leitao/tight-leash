<script>
  import EditableText from "./EditableText.svelte";
  import ContextMenu from "./ContextMenu.svelte";
  let dh;
  export let tag;
  export let title;
  export let description;
  export let week;

  let menuItems = [
    { name: "circle", displayText: "Pending", color:"blue" },
    { name: "triangle", displayText: "Approved", color:"purple" },
    { name: "square", displayText: "Doing" , color:"orange"},
    { name: "octagon", displayText: "Denied", color:"red"},
    { name: "hexagon", displayText: "Completed" , color:"green"},
  ];

  function handleThing(event) {
    console.log(event.detail.thing);
  }

  function translateWeek(week) {
    if (week < 0) {
      return "Delayed";
    }
    if (week === 0) {
      return "This week";
    }
    if (week === 1) {
      return "Next week";
    }
    return `In ${week} weeks`;
  }

  function submit(field) {
    return ({ detail: newValue }) => {
      // IRL: POST value to server here
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }
</script>

<div class="task">
  <div class="header">
    <div class="title-updated">
      <div class="title">
        <EditableText value={title} />
      </div>
      <div class="updated">Last updated by Antonio</div>
    </div>
    <div class="tags-date">
      <div class="tags">
        <ContextMenu {menuItems} on:doThing{handleThing}>
          <div class="tag {tag}">
            {tag}
          </div>
        </ContextMenu>
      </div>
      <div class="date">{translateWeek(week)}</div>
    </div>
  </div>

  <div class="content" style="height:{dh}px">
    <EditableText value={description} />
  </div>
</div>

<style>
  .task {
    padding: 1.3rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .title {
    color: var(--clr-text1);
    font-size: 1rem;
    font-weight: 500;
    height: fit-content;
    padding-right: 0.5rem;
  }

  .updated,
  .date {
    color: var(--clr-text2);
    font-size: 0.9rem;
  }

  .tags-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
  }

  .tags {
    display: flex;
    justify-content: right;
  }
  .tag {
    border-radius: 0.3rem;
    font-size: 0.65rem;
    letter-spacing: 0.05rem;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    padding: 0.1rem 0.2rem 0.1rem 0.2rem;
    color: var(--clr-background);
  }

  .tag.Pending {
    background-color: var(--clr-blue);
  }

  .tag.Approved {
    background-color: var(--clr-purple);
  }

  .tag.Doing {
    background-color: var(--clr-orange);
  }

  .tag.Denied {
    background-color: var(--clr-red);
  }

  .tag.Completed {
    background-color: var(--clr-green);
  }

  .content {
    font-size: 0.75rem;
    height: fit-content;
  }

  .task:not(:last-child) {
    border-bottom: 1px solid var(--clr-background-deeper);
  }
</style>
