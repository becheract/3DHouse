export const vertexShader = `
// vertex shader
varying vec2 vUv;
varying float vAffine;

uniform float uvScale; // Scaling factor for UVs

void main() {
  // Transforming the vertex position to model-view space
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Scale the UV coordinates
  vUv = uv * uvScale;

  // Calculate distance from the camera to the vertex
  float dist = length(mvPosition.xyz);

  // Calculate affine distortion factor
  float affine = dist + (mvPosition.w * 8.0) / dist * 0.5;
  
  // Pass affine to the fragment shader
  vAffine = affine;

  // Apply standard transformation to clip space
  gl_Position = projectionMatrix * mvPosition;
}
`;
