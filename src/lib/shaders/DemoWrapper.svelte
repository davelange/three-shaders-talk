<script>
  import { Canvas } from '@threlte/core';
  import Demo from './Demo.svelte';

  let red = $state(0);
</script>

<Canvas>
  <Demo {red} />
</Canvas>

<div>
  <input
    type="range"
    min={0}
    max={1}
    step="0.01"
    bind:value={red}
  />
</div>

<style>
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 8vh;
    margin: auto;
    width: fit-content;
  }
</style>
