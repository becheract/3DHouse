export const vertexShader = `
// Vertex Shader
varying vec2 vUv;          // Pass UV coordinates to fragment shader
varying float vAffine;     // Pass affine distortion factor to fragment shader
varying vec3 vColor;       // Pass calculated vertex color (lighting) to fragment shader

uniform float uvScale;      // Scaling factor for UVs
uniform float uJitterLevel; // Jitter level for PS1 effect
uniform vec3 lightPosition; // Light position in world space
uniform vec3 lightColor;    // Light color
uniform vec3 ambientColor;  // Ambient light color

void main() {
  // Transform the vertex position to model-view space
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Pass UV coordinates (unscaled for this example)
  vUv = uv;

  // Calculate affine distortion factor
  float dist = length(mvPosition.xyz);
  float affine = dist + (mvPosition.w * 8.0) / dist * 0.5;
  vAffine = affine;

  // Calculate normal in world space
  vec3 normal = normalize(normalMatrix * normal);

  // Calculate light direction
  vec3 lightDir = normalize(lightPosition - mvPosition.xyz);

  // Calculate diffuse intensity
  float diffuse = max(dot(normal, lightDir), 0.0);

  // Combine ambient and diffuse lighting
  vec3 lighting = ambientColor + (lightColor * diffuse);
  vColor = lighting; // Pass lighting result to the fragment shader

  // Transform to clip space
  gl_Position = projectionMatrix * mvPosition;

  // Apply PS1-style jitter in NDC space
  vec2 ndcPos = gl_Position.xy / gl_Position.w;
  ndcPos = floor(ndcPos * uJitterLevel) / uJitterLevel;

  // Reapply perspective divide
  gl_Position.xy = ndcPos * gl_Position.w;
}
`;
