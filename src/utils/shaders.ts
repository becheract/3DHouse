export const vertexShader = `
// vertex shader
varying vec2 vUv;
varying float vAffine;

float dist = length(mvPosition);
float affine = dist + (pos.w * 8.0) / dist * 0.5;
vUv = vUv * affine;
vAffine = affine;

vec2 resolution = vec2(320, 240);
vec4 pos = projectionMatrix * mvPosition;

pos.xyz /= pos.w;
pos.xy = floor(resolution * pos.xy) / resolution;
pos.xyz *= pos.w;
`;

export const fragmentShader = `
// fragment shader
varying vec2 vUv;
varying float vAffine;

vec2 uv = vUv / vAffine;
vec4 color = texture2D(map, uv);
`;
