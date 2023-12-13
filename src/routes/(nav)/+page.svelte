<script>
  import { enhance } from "$app/forms";
  import { slide } from "svelte/transition";

  export let data;
  export let form;
</script>

<h1>Welcome, {data.user.name}</h1>

<div class="divider"></div>
<div class="flex flex-col gap-2 h-[66vh] overflow-scroll">
  {#each data?.messages as msg (msg?.id)}
    <div transition:slide class="flex justify-between bg-secondary outline-dashed outline-1">
      <div class=" flex">
        {msg?.user?.name}
        <img
          class="w-10 h-10 rounded-lg"
          alt=""
          src="https://api.dicebear.com/7.x/identicon/svg?backgroundType=gradientLinear,solid&backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${msg
            ?.user?.name}"
        />
        {msg?.text}
      </div>

      <form use:enhance action="?/deleteMessage" method="post">
        <input type="hidden" name="id" value={msg?.id} />
        <button class="btn btn-error">❌</button>
      </form>
    </div>
  {/each}
</div>

<div class="divider"></div>

{#if form?.message?.text}
  <p class="text-error">{form?.message?.text}</p>
{/if}

<form use:enhance method="post" action="?/publishMessage">
  <input type="hidden" name="userId" value={data.user.id} />
  <input type="text" name="text" class="input" placeholder="type your message" />
  <button type="submit" class="btn btn-primary">Send</button>
</form>
