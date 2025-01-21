<script lang="ts">
  import { game } from '$lib/state.svelte';
  import {
    Vector3,
    type RigidBody as RigidBodyType
  } from '@dimforge/rapier3d-compat';
  import { T } from '@threlte/core';
  import { Collider, RigidBody } from '@threlte/rapier';
  import PlayerModel from './PlayerModel.svelte';

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
    type="dynamic"
    gravityScale={4}
    linearDamping={0.2}
    bind:rigidBody
  >
    <Collider
      shape="cuboid"
      args={[0.4, 0.6, 0.4]}
      mass={3}
      restitution={0.7}
      friction={10}
      contactForceEventThreshold={0.1}
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
      <PlayerModel />
    </Collider>
  </RigidBody>
</T.Group>
