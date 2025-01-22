/* Position of the pixel */
varying vec2 vUv;

/* Uniforms are like arguments passed in */
uniform float red;
uniform float time;
uniform sampler2D logo; // <- this is an image

vec4 blue = vec4(0., 0., 1., 1.);

void main() {
    vec4 color = blue;

    /* 
    color.g += vUv.y;
    color.r += red;

    vec2 imagePoint = vUv;
    imagePoint.x += sin(vUv.y * 10.);
    imagePoint.x += sin(8. * vUv.y) * red;
    vec4 tex = texture2D(logo, imagePoint); */

    gl_FragColor = color; // <- final output
}