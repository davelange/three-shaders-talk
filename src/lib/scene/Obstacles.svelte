<script lang="ts">
  import { T } from '@threlte/core';
  import { AutoColliders, RigidBody } from '@threlte/rapier';
  import { Vector3 } from '@dimforge/rapier3d-compat';
  import { game } from '$lib/state.svelte';
  import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';

  let count = 5;
  let speed = 5;
  let gapBetween = 10;

  let objects = $state<RigidBodyType[]>(new Array(count).fill(undefined));

  // set initial position
  function resetObstacle(idx: number) {
    objects[idx]?.setTranslation(
      new Vector3(gapBetween * (idx + 1), 0, 0),
      true
    );
  }

  // go to back of queue after going out of view
  function cycleBack(idx: number) {
    objects[idx]?.setTranslation(
      new Vector3(gapBetween * objects.length - 1, 0.5, 0),
      true
    );
  }

  game.on('gameRestarted', () => {
    objects.map((_o, idx) => resetObstacle(idx));
  });
</script>

{#each Array(count), idx}
  <T.Group position={[0, 0.5, 0]}>
    <RigidBody
      type="kinematicVelocity"
      linearVelocity={[game.status === 'playing' ? -speed : 0, 0, 0]}
      lockRotations
      userData={{ type: 'obstacle' }}
      bind:rigidBody={objects[idx]}
      oncreate={() => resetObstacle(idx)}
    >
      <AutoColliders
        shape={'cuboid'}
        mass={10}
        onsensorenter={() => cycleBack(idx)}
      >
        <T.Mesh castShadow>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial
            color="blue"
            transparent
            opacity={game.status === 'idle' ? 0 : 1}
          />
        </T.Mesh>
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/each}
