export const vertexShader = `
varying vec2 vUv;
varying float vAffine;

uniform float uvScale;      // Scaling factor for UVs
uniform float uJitterLevel; // Jitter level for PS1 effect
uniform vec2 atlasOffset;   // Offset for the texture in the atlas
uniform vec2 atlasScale;    // Scale for the texture in the atlas

void main() {
    // Transform the vertex position to model-view space
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Map UVs to the correct region of the texture atlas
    vUv = (uv * atlasScale) + atlasOffset;

    // Calculate affine distortion factor
    float dist = length(mvPosition.xyz);
    float affine = dist + (mvPosition.w * 8.0) / dist * 0.5;
    vAffine = affine;

    // Transform to clip space
    gl_Position = projectionMatrix * mvPosition;

    // Apply jitter in NDC space
    vec2 ndcPos = gl_Position.xy / gl_Position.w;
    ndcPos = floor(ndcPos * uJitterLevel) / uJitterLevel;

    // Reapply perspective divide
    gl_Position.xy = ndcPos * gl_Position.w;
}

`;
