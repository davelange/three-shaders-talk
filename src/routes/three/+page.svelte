<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  // Create the scene
  const scene = new THREE.Scene();

  // Camera
  const width = window.innerWidth;
  const height = window.innerHeight;
  const camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    -100,
    1000
  );
  camera.position.set(10, 10, 10);
  camera.zoom = 80;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.updateProjectionMatrix();

  // Add a cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.castShadow = true;
  scene.add(cubeMesh);

  // Add obstacles
  const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'blue' });
  const obstacleMeshes = Array.from({ length: 4 }).map((_o, idx) => {
    let mesh = new THREE.Mesh(cubeGeometry, obstacleMaterial);
    mesh.position.x = (idx + 1) * 10;
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
  });

  // Add lights
  const ambientLight = new THREE.AmbientLight('#fff', 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffaa00, 1);
  pointLight.position.z = 3;
  pointLight.position.y = 5;
  pointLight.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(pointLight);

  const dirLight = new THREE.DirectionalLight(0xffaa00, 1.8);
  dirLight.position.set(5, 10, 7);
  dirLight.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(dirLight);

  // Create renderer
  let renderer: THREE.WebGLRenderer;

  onMount(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    // Make it not look terrible
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Render
    render();
  });

  // Render loop
  function render() {
    obstacleMeshes.map((item) => {
      item.position.setX(item.position.x - 0.05);
    });

    renderer.render(scene, camera);

    window.requestAnimationFrame(render);
  }
</script>

<canvas id="canvas"></canvas>

<style>
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
