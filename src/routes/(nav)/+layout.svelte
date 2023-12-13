<script>
  import Navbar from "$lib/components/Navbar.svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<Navbar user={data.user} />

<slot />

{#if data.user.name}
  <form action="/auth?/logout" method="post">
    <button class="absolute bottom-0 btn btn-ghost">Log out</button>
  </form>
{/if}
