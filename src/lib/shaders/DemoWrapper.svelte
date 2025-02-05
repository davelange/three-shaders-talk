<script>
  import { Canvas } from '@threlte/core';
  import Demo from './Demo.svelte';

  let someNumber = $state(0);
</script>

<Canvas>
  <Demo {someNumber} />
</Canvas>

<div>
  <p>someNumber: {someNumber.toPrecision(3)}</p>
  <input
    type="range"
    min={0}
    max={1}
    step="0.01"
    bind:value={someNumber}
  />
</div>

<style>
  div {
    position: absolute;
    left: 0;
    right: 0;
    top: 3vh;
    margin: auto;
    width: fit-content;
  }
  p {
    color: white;
  }
</style>
