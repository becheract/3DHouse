export const fragmentShader = `
uniform sampler2D map;
varying vec2 vUv;
varying float vAffine;

void main() {
    float affineFactor = max(vAffine, 0.001);

    // Apply affine distortion while keeping UVs inside the atlas tile
    vec2 uv = vUv + (vUv - 0.5) * (1.0 - 1.0 / affineFactor);

    // Ensure UV stays within the assigned atlas tile
    uv = clamp(uv, vUv - 0.5 * (1.0 - affineFactor), vUv + 0.5 * (1.0 - affineFactor));

    gl_FragColor = texture2D(map, uv);
}

`;