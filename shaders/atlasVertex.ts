export const vertexShader = `
uniform float uJitterLevel; 
uniform vec2 uTileOffset;  // Offset for selecting texture from atlas
uniform vec2 uTileScale;   // Scale to extract the correct texture

varying vec2 vUv;
varying float vAffine;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Convert to screen space (NDC)
    vec2 ndcPos = gl_Position.xy / gl_Position.w;

    // Apply vertex snapping (PS1 affine transformation)
    ndcPos = floor(ndcPos * uJitterLevel + 0.5) / uJitterLevel;

    // Reapply perspective divide
    gl_Position.xy = ndcPos * gl_Position.w;

    // Adjust UVs based on the tile selection
    vUv = (uv * uTileScale) + uTileOffset;

    // Compute affine distortion
    float dist = length(mvPosition.xyz);
    vAffine = dist + (mvPosition.w * 8.0) / dist * 0.5;
}

`;
