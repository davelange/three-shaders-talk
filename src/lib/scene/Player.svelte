<script lang="ts">
  import {
    Vector3,
    type RigidBody as RigidBodyType
  } from '@dimforge/rapier3d-compat';
  import { T } from '@threlte/core';
  import { AutoColliders, RigidBody } from '@threlte/rapier';

  let rigidBody = $state<RigidBodyType>();

  function handleClick(event: KeyboardEvent) {
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
    >
      <T.Mesh castShadow>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial color="red" />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
