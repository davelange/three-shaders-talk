<script lang="ts">
  import { T, useThrelte, useTask } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import { Debug } from '@threlte/rapier';
  import Obstacles from './Obstacles.svelte';
  import Player from './Player.svelte';
  import Floor from './Floor.svelte';
  import {
    EffectComposer,
    RenderPass,
    ShaderPass
  } from 'three/examples/jsm/Addons.js';
  import { WobblePass } from '$lib/wobble';
  import * as THREE from 'three';
  import { game } from '$lib/state.svelte';

  const { scene, renderer, camera, size } = useThrelte();

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera.current));
  const pass = new ShaderPass(WobblePass);
  composer.addPass(pass);

  const target = new THREE.WebGLRenderTarget(
    size.current.width,
    size.current.height
  );

  useTask((deltaTime) => {
    renderer.setRenderTarget(target);
    renderer.render(scene, camera.current);

    pass.uniforms.uTexture.value = target.texture;
    pass.uniforms.uTimer.value = game.wobbleEffectTimer.current;

    composer.render(deltaTime);
  });
</script>

<!-- Camera -->
<T.OrthographicCamera
  makeDefault
  position={[10, 10, 10]}
  zoom={100}
>
  <OrbitControls />
</T.OrthographicCamera>

<Player />

<Obstacles />

<Floor />

<!-- Debug -->
<!-- <Debug color="green" /> -->

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
