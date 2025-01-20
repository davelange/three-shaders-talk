<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import { World } from '@threlte/rapier';
</script>

<Canvas autoRender={false}>
  <World>
    <Scene />
  </World>
</Canvas>
