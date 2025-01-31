<script lang="ts">
  import SceneWrapper from '$lib/scene/SceneWrapper.svelte';
  import { game } from '$lib/state.svelte';
</script>

<SceneWrapper />

<div class="panel">
  {#if game.status === 'idle'}
    <p>Hit Space to jump</p>
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
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 20vh;
    width: fit-content;
    margin: auto;
    color: #e0e7ff;

    & button {
      margin-top: 1rem;
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
