export const vertexShader = `
// vertex shader
varying vec2 vUv;
varying float vAffine;

uniform float uvScale; // Scaling factor for UVs
uniform float uJitterLevel;
void main() {
  vec2 resolution = vec2(320, 240);

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

  // Apply the standard transformation to clip space
  gl_Position = projectionMatrix * mvPosition;

  // Apply jitter in NDC (Normalized Device Coordinates) space
  vec2 ndcPos = gl_Position.xy / gl_Position.w;
  ndcPos = floor(ndcPos * uJitterLevel) / uJitterLevel;

  // Reapply the perspective divide
  gl_Position.xy = ndcPos * gl_Position.w;
}
`;
