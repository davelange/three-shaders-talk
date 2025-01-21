<script lang="ts">
  import { T } from '@threlte/core';
  import { type PhysicalObstacle } from '$lib/utils';
  import { AutoColliders, RigidBody } from '@threlte/rapier';
  import { Vector3 } from '@dimforge/rapier3d-compat';
  import { game } from '$lib/state.svelte';

  let count = 5;

  let objects = $state<PhysicalObstacle[]>(
    new Array(count).fill(undefined).map((_a, ind) => ({
      x: 10 * (ind + 1),
      z: 0,
      y: 0.5,
      rigidBody: undefined
    }))
  );
</script>

{#each objects as obj, idx}
  <T.Group position={[obj.x, obj.y, obj.z]}>
    <RigidBody
      type="kinematicVelocity"
      linearVelocity={[game.isPlaying ? -5 : 0, 0, 0]}
      lockRotations
      dominance={20}
      userData={{ type: 'obstacle' }}
      bind:rigidBody={objects[idx].rigidBody}
    >
      <AutoColliders
        shape={'cuboid'}
        mass={10}
        onsensorenter={() => {
          objects[idx].rigidBody?.setTranslation(
            new Vector3(10 * objects.length - 1, obj.y, 0),
            true
          );
        }}
      >
        <T.Mesh castShadow>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial color="blue" />
        </T.Mesh>
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/each}
