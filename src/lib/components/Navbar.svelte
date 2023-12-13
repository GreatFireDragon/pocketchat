<script>
  import ThemeChanger from "./ThemeChanger.svelte";

  export let user;
</script>

<nav class="flex justify-between px-3 py-2">
  <!-- <h1>Main navigation</h1> -->
  <ul class="flex gap-2">
    <li><a href="/">Home</a></li>
    {#if !user.name}
      <li><a href="/auth/register">Register</a></li>
      <li><a href="/auth/login">Login</a></li>
    {/if}
  </ul>

  <ThemeChanger></ThemeChanger>
</nav>

<style>
  ul > li {
    @apply inline-block;
  }

  ul > li > a {
    @apply link;
  }
</style>
