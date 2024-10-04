export const vertexShader = `
  varying vec3 vPosition;
  
  void main() {
    vPosition = position; // Pass the position to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec3 vPosition;
  
  void main() {
    gl_FragColor = vec4(vPosition * 0.5 + 0.5, 1.0); // Color based on vertex position
  }
`;
