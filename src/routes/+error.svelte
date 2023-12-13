<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
</script>

<main
  transition:slide
  class=" absolute inset-0 top-1/2 -translate-y-1/2 text-center text-red-500 font-black"
>
  <h1>ЕГГОГ {$page?.status}</h1>
  <h1>{$page?.error?.message}</h1>
  <!-- <h1>НОТЕ ФАУНДЕ</h1> -->
  <div class="divider">↓</div>
  <a href="/" class="btn btn-primary">Go back to the main page</a>
</main>
