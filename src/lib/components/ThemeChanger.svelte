<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import themes from "$lib/themes";

  let nextTheme;
  const getNextTheme = (curTheme) => themes[themes.indexOf(curTheme) + 1] || themes[0];

  onMount(() => {
    const cookieTheme = document.documentElement.getAttribute("data-theme");
    nextTheme = getNextTheme(cookieTheme);
  });

  function submitTheme() {
    document.documentElement.setAttribute("data-theme", nextTheme);
    nextTheme = getNextTheme(nextTheme);
  }
</script>

<form
  use:enhance={submitTheme}
  method="post"
  action="/?/changeTheme&theme={nextTheme}&redirectTo={$page.url.pathname}"
>
  <button type="submit">☀</button>
</form>
