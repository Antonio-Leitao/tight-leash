<script>
  import LucideIcon from "./LucideIcon.svelte";
</script>

<div class="button">
    <div class="icon">
        <LucideIcon name={"user"} />
    </div>
 
  Sign in with Google
</div>

<style>
  .button {
    --background: #2b3044;
    --background-hover: #1e2235;
    --text: #fff;
    --shadow: rgba(0, 9, 61, 0.2);
    position: relative;
    border: none;
    outline: none;
    background: none;
    padding: 10px 15px;
    border-radius: 7px;
    min-width: 142px;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: var(--text);
    background: var(--background);
    box-shadow: 0 var(--shadow-y, 4px) var(--shadow-blur, 8px) var(--shadow);
    transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
    font-weight:500;
  }
  .button:hover {
    background-color: var(--background-hover);
  }

  .icon{
    margin-right: 8px;
  }
</style>
