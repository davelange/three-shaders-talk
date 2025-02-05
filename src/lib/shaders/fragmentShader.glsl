/* Position (x, y) of the pixel, 0 - 1 */
varying vec2 vUv;

/* Uniforms are like arguments passed in */
uniform float someNumber;
uniform float time;
uniform sampler2D logo; // <- this is an image

vec4 blue = vec4(0., 0., 1., 1.);

void main() {
    vec4 color = blue;

    // vec2 imagePoint = vUv;
    // vec4 tex = texture2D(logo, imagePoint);

    gl_FragColor = color; // <- final output
}