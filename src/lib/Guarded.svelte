<script>
  export let params;
  import Project from "./Project.svelte";
  import LucideIcon from "./LucideIcon.svelte";
</script>

<h1>
  This is the {params.name} blog!
</h1>

<div class="add">
    <LucideIcon name={"plus"}/>
</div>
<Project />

<style>
    .add{
        cursor: pointer;
        background-color:var(--clr-background);
        width:2.5rem;
        height:2.5rem;
        display:grid;
        place-items:center;
        border-radius: 50%;
        margin:1.7rem;
    }

    .add:hover{
        background-color:var(--clr-gray);
    }
</style>
