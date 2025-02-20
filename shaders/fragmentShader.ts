export const fragmentShader = `
uniform sampler2D map;
varying vec2 vUv;
varying float vAffine;

void main() {
    float affineFactor = max(vAffine, 0.001);
    vec2 uv = vUv / affineFactor;
    
    // Ensure UV stays within the tile bounds (0-1 range inside the subregion)
    uv = clamp(uv, vec2(0.0), vec2(1.0));

    gl_FragColor = texture2D(map, uv);
}

`;