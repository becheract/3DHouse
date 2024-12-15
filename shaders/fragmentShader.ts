export const fragmentShader = `
// Fragment Shader
varying vec2 vUv;          // UV coordinates from vertex shader
varying float vAffine;     // Affine distortion factor from vertex shader
varying vec3 vColor;       // Interpolated lighting color from vertex shader

uniform sampler2D map; // Texture map

void main() {
  // Normalize affine factor to avoid extreme distortions
  float normalizedAffine = max(vAffine, 1.0);

  // Apply affine distortion to UVs
  vec2 distortedUv = vUv / normalizedAffine;

  // Sample texture
  vec4 texColor = texture2D(map, distortedUv);

  // Modulate texture color with interpolated lighting
  vec3 shadedColor = texColor.rgb * vColor;

  // Final output
  gl_FragColor = vec4(shadedColor, texColor.a); // Preserve alpha from texture
}
`;
