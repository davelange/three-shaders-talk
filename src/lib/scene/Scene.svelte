<script lang="ts">
  import { T, useThrelte, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { Debug } from '@threlte/rapier';
  import PhysObstacles from './PhysObstacles.svelte';
  import Player from './Player.svelte';
  import Floor from './Floor.svelte';
  import {
    EffectComposer,
    RenderPass,
    ShaderPass
  } from 'three/examples/jsm/Addons.js';
  import { WobblePass } from '$lib/wobble';
  import * as THREE from 'three';
  import { Spring, Tween } from 'svelte/motion';

  const { scene, renderer, camera, size } = useThrelte();

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera.current));
  const pass = new ShaderPass(WobblePass);
  composer.addPass(pass);

  const target = new THREE.WebGLRenderTarget(
    size.current.width,
    size.current.height
  );

  /* let tweened = new Tween(0, {
    duration: 400
  }); */
  let tweened = new Spring(0, {
    stiffness: 0.3,
    damping: 0.08
  });

  useTask((deltaTime) => {
    renderer.setRenderTarget(target);
    renderer.render(scene, camera.current);

    pass.uniforms.uTexture.value = target.texture;
    console.log(tweened.current);
    pass.uniforms.uTimer.value = tweened.current;

    composer.render(deltaTime);

    //renderer.render(scene, camera.current);
  });
</script>

<!-- Cammera -->
<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={100}
>
  <OrbitControls />
</T.OrthographicCamera>

<Player {tweened} />

<!-- <Obstacles /> -->
<PhysObstacles />

<Floor />

<!-- Debug -->
<!-- <T.AxesHelper scale={5} />
<Debug color="green" /> -->

<!-- Lights -->
<T.DirectionalLight
  color={0xffffff}
  intensity={1.8}
  position={[5, 10, 7]}
  castShadow
/>
<T.PointLight
  color={0xffaa00}
  intensity={1}
  position={[-3, 5, 3]}
  castShadow
/>
<T.AmbientLight
  color={0x404040}
  intensity={0.8}
  position={[-3, 5, 3]}
/>
