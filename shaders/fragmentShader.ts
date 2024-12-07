export const fragmentShader = `
varying vec2 vUv;
varying float vAffine;

uniform sampler2D map; // Texture map

void main() {
  // Normalize affine factor to avoid extreme distortions
  float normalizedAffine = max(vAffine, 1.0);

  // Apply affine distortion to UVs
  vec2 distortedUv = vUv / normalizedAffine;

  // Sample texture
  vec4 texColor = texture2D(map, distortedUv);

  // Final output
  gl_FragColor = texColor;
}

`;
