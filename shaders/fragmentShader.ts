export const fragmentShader = `
// fragment shader
varying vec2 vUv;
varying float vAffine;

uniform sampler2D map; // Your texture map


void main() {
  // Apply affine transformation to the UV coordinates
  vec2 uv = vUv / vAffine;

  // Sample the texture
  vec4 color = texture2D(map, uv);

  // Output the final color
  gl_FragColor = color;
}
`;