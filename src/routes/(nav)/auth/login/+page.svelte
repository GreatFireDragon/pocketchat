<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  /** @type {import('./$types').PageData} */
  // export let data;

  $: message = $page.url.searchParams.get("message");

  const predefinedUsers = [{}];
</script>

<main class="px-3" transition:slide>
  {#if message}
    <p>{message}</p>
  {/if}

  <h1>Login</h1>
  <form class="flex flex-col" action="/auth?/login" method="post">
    <input
      name="email"
      autocomplete="email"
      placeholder="email"
      type="email"
      value="kulmike2002@gmail.coma"
    />
    <input
      name="password"
      autocomplete="new-password"
      placeholder="password"
      type="password"
      value="123123123"
    />
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</main>
