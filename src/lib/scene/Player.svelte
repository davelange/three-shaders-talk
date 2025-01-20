<script lang="ts">
  import { game } from '$lib/state.svelte';
  import {
    Vector3,
    type RigidBody as RigidBodyType
  } from '@dimforge/rapier3d-compat';
  import { T } from '@threlte/core';
  import { AutoColliders, RigidBody } from '@threlte/rapier';

  let rigidBody = $state<RigidBodyType>();

  async function handleClick(event: KeyboardEvent) {
    if (event.code === 'Space') {
      rigidBody?.applyImpulse(new Vector3(0, 50, 0), true);
    }
  }
</script>

<svelte:document onkeydown={handleClick} />

<T.Group position.y={0.5}>
  <RigidBody
    gravityScale={4}
    linearDamping={0.2}
    bind:rigidBody
  >
    <AutoColliders
      mass={3}
      restitution={0.5}
      oncollisionenter={({ targetRigidBody }) => {
        if (
          targetRigidBody &&
          (targetRigidBody.userData as Record<string, string>).type ===
            'obstacle'
        ) {
          game.stop();
        }
      }}
    >
      <T.Mesh castShadow>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color="red" />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
