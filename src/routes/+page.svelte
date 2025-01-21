<script lang="ts">
  import SceneWrapper from '$lib/scene/SceneWrapper.svelte';
  import '$lib/styles/reset.css';
  import '$lib/styles/app.css';
  import { game } from '$lib/state.svelte';
</script>

<SceneWrapper />

<div class="panel">
  {#if game.status === 'idle'}
    <button
      onclick={() => {
        game.start();
      }}
    >
      Start
    </button>
  {:else if game.status === 'lost'}
    <button
      onclick={() => {
        game.restart();
      }}
    >
      Try again
    </button>
  {/if}
</div>

<style>
  .panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 20vh;
    width: fit-content;
    margin: auto;
    color: #e0e7ff;

    & button {
      padding: 0.5rem 1rem;
      border-radius: 0;
      font-weight: 600;
      background-color: #4f46e5;
      color: #e0e7ff;

      &:hover {
        background-color: #4338ca;
      }
    }
  }
</style>
