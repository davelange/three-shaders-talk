<script lang="ts">
  import { T } from '@threlte/core';
  import { AutoColliders, Collider, RigidBody } from '@threlte/rapier';
  import { degToRad } from 'three/src/math/MathUtils.js';
</script>

<T.Group rotation={[degToRad(-90), 0, 0]}>
  <RigidBody type="fixed">
    <AutoColliders>
      <T.Mesh receiveShadow>
        <T.PlaneGeometry args={[100, 100]} />
        <T.MeshStandardMaterial color={0x242424} />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

<T.Group
  rotation={[0, degToRad(90), degToRad(90)]}
  position={[-15, 0, 0]}
>
  <RigidBody type="fixed">
    <Collider
      sensor
      shape="cuboid"
      args={[10, 10, 0]}
    />
  </RigidBody>
</T.Group>
