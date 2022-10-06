<script>
  import {
    Search,
    Printer,
    Settings,
    Trash2,
    Circle,
    Triangle,
    Square,
    Hexagon,
    Octagon,
    Info,
    ChevronUp,
    ChevronDown,
    Plus,
    CheckSquare,
    User,
    CornerUpLeft,
    Minus,
  } from "lucide-svelte";
  export let name;
</script>

{#if name === "search"}
  <svelte:component this={Search} {...$$props} />
{:else if name === "printer"}
  <svelte:component this={Printer} {...$$props} />
{:else if name === "settings"}
  <svelte:component this={Settings} {...$$props} />
{:else if name === "trash"}
  <svelte:component this={Trash2} {...$$props} />
{:else if name === "info"}
  <svelte:component this={Info} {...$$props} />
{:else if name === "chevron up"}
  <svelte:component this={ChevronUp} {...$$props} />
{:else if name === "chevron down"}
  <svelte:component this={ChevronDown} {...$$props} />
{:else if name === "circle"}
  <svelte:component this={Circle} {...$$props} />
{:else if name === "triangle"}
  <svelte:component this={Triangle} {...$$props} />
{:else if name === "square"}
  <svelte:component this={Square} {...$$props} />
{:else if name === "hexagon"}
  <svelte:component this={Hexagon} {...$$props} />
{:else if name === "octagon"}
  <svelte:component this={Octagon} {...$$props} />
{:else if name === "plus"}
  <svelte:component this={Plus} {...$$props} />
{:else if name === "minus"}
  <svelte:component this={Minus} {...$$props} />
{:else if name === "check square"}
  <svelte:component this={CheckSquare} {...$$props} />
{:else if name === "user"}
  <svelte:component this={User} {...$$props} />
{:else if name === "corner up left"}
  <svelte:component this={CornerUpLeft} {...$$props} />
{:else}
  <svelte:component this={Square} color={"rgba(0,0,0,0)"} />
{/if}
