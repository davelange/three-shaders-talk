<script lang="ts">
  import { useGltf } from '@threlte/extras';
  import { T } from '@threlte/core';
  import { degToRad } from 'three/src/math/MathUtils.js';

  let gltf = useGltf('/assets/chicken/scene.gltf');
</script>

{#if $gltf}
  <T.Group
    scale={0.3}
    position={[0.15, -0.25, 0]}
  >
    <T.Mesh
      on:create={({ ref }) => {
        ref.geometry.center();
      }}
      castShadow
      geometry={$gltf.nodes.Object_4.geometry}
      material={$gltf.materials.Material}
      scale={[0.74, 1.5, 0.74]}
      rotation={[0, degToRad(90), 0]}
    />
  </T.Group>
{/if}
