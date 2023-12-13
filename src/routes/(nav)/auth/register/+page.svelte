<script>
  import { fly, slide } from "svelte/transition";

  /** @type {import('./$types').PageData} */
  // export let data;
</script>

<main class="px-3" transition:slide>
  <h1>Registration</h1>
  <form class="flex flex-col" action="/auth?/register" method="post">
    <input name="email" autocomplete="email" placeholder="email" type="email" />
    <input name="name" autocomplete="name" placeholder="name" type="text" />
    <input name="password" autocomplete="new-password" placeholder="password" type="password" />
    <input
      name="passwordConfirm"
      autocomplete="new-password"
      placeholder="passwordConfirm"
      type="password"
    />
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</main>
