<script lang="ts">
  import {
    Vector3,
    type RigidBody as RigidBodyType
  } from '@dimforge/rapier3d-compat';
  import { T } from '@threlte/core';
  import { AutoColliders, RigidBody } from '@threlte/rapier';
  import type { Spring, Tween } from 'svelte/motion';

  let { tweened }: { tweened: Spring<number> } = $props();

  let rigidBody = $state<RigidBodyType>();

  async function handleClick(event: KeyboardEvent) {
    if (event.code === 'Space') {
      rigidBody?.applyImpulse(new Vector3(0, 50, 0), true);
      await tweened.set(1);

      tweened.set(0, {
        instant: true
      });
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
        if (targetRigidBody && targetRigidBody.userData.type === 'obstacle') {
          console.log('go');
          //tweened.set(1);
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
