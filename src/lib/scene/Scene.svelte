<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { Debug } from '@threlte/rapier';
  import PhysObstacles from './PhysObstacles.svelte';
  import Player from './Player.svelte';
  import { interactivity } from '@threlte/extras';
  import Floor from './Floor.svelte';

  interactivity();
</script>

<!-- Cammera -->
<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={100}
>
  <OrbitControls />
</T.OrthographicCamera>

<Player />

<!-- <Obstacles /> -->
<PhysObstacles />

<Floor />

<!-- Debug -->
<T.AxesHelper scale={5} />
<Debug color="green" />

<!-- Lights -->
<T.DirectionalLight
  color={0xffffff}
  intensity={1.8}
  position={[5, 10, 7]}
  castShadow
/>
<T.PointLight
  color={0xffaa00}
  intensity={1}
  position={[-3, 5, 3]}
  castShadow
/>
<T.AmbientLight
  color={0x404040}
  intensity={0.8}
  position={[-3, 5, 3]}
/>
