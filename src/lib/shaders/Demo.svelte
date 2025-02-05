<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import vertexShader from './vertexShader.glsl?raw';
  import fragmentShader from './fragmentShader.glsl?raw';
  import { ShaderMaterial, TextureLoader, Uniform } from 'three';

  let { someNumber }: { someNumber: number } = $props();

  let shaderMaterial = $state<ShaderMaterial>();

  // use an image
  let img = new TextureLoader().load('/logo.jpeg');

  // on every frame
  useTask((delta) => {
    if (!shaderMaterial) return;

    shaderMaterial.uniforms.someNumber.value = someNumber;
    shaderMaterial.uniforms.time.value = delta;
  });
</script>

<T.Mesh>
  <T.PlaneGeometry args={[6, 6]} />
  <!-- <T.MeshBasicMaterial color="red" /> -->
  <T.ShaderMaterial
    bind:ref={shaderMaterial}
    {vertexShader}
    {fragmentShader}
    uniforms={{
      logo: new Uniform(img),
      someNumber: new Uniform(0),
      time: new Uniform(0)
    }}
  />
</T.Mesh>
