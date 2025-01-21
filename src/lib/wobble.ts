export const WobblePass = {
  name: 'Wobble',

  uniforms: {
    uTexture: null,
    uTimer: 0
  },

  vertexShader: /* glsl */ `
  
    varying vec2 vUv;
    uniform float uTimer;
    

    void main() {
      vUv = uv;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,

  fragmentShader: /* glsl */ `         
    varying vec2 vUv;

    uniform sampler2D uTexture;
    uniform float uTimer;

    void main() {
      vec2 modUv = vUv;
      float modTimer = uTimer > 0.5 ?  1. - uTimer : uTimer * 2.;
      float disp = sin(30. * vUv.y) * 0.03 * modTimer;
      modUv.x += disp;
      
      vec4 tex = texture2D(uTexture, modUv);            

      gl_FragColor = tex;

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
  }`
};
