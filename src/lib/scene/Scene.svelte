<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import Obstacles from './Obstacles.svelte';
</script>

<!-- Cammera -->
<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={100}
>
  <OrbitControls />
</T.OrthographicCamera>

<T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshStandardMaterial color="red" />
</T.Mesh>

<Obstacles />

<T.AxesHelper scale={5} />

<!-- Lights -->
<T.DirectionalLight
  color={0xffffff}
  intensity={1.8}
  position={[5, 10, 7]}
/>
<T.PointLight
  color={0xffaa00}
  intensity={1}
  position={[-3, 5, 3]}
/>
<T.AmbientLight
  color={0x404040}
  intensity={0.8}
  position={[-3, 5, 3]}
/>
