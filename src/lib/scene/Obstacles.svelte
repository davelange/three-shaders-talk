<script lang="ts">
  import { rand } from '$lib/utils';
  import { T, useTask } from '@threlte/core';

  type Object = { x: number; z: number };

  let count = 5;
  let motionRate = 0.1;
  let objects = $state<Object[]>(
    new Array(count).fill(null).map((_a, ind) => ({
      x: 10 * (ind + 1),
      z: rand(-4, 4)
    }))
  );

  useTask(() => {
    objects.map((item) => {
      if (item.x < -10) {
        item.x = 10 * objects.length - 1;
        item.z = rand(-4, 4);
      } else {
        item.x = item.x - motionRate;
      }
      return item;
    });
  });
</script>

{#each objects as obj}
  <T.Mesh
    position.x={obj.x}
    position.z={obj.z}
  >
    <T.BoxGeometry args={[1, 1, 1]} />
    <T.MeshStandardMaterial color="blue" />
  </T.Mesh>
{/each}
