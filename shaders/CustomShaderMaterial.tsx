
  import * as THREE from "three";


  const createCustomMaterial = (color :string, jitterLevel : number, texture : THREE.Texture) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      map: texture || null,
 
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uJitterLevel = { value: jitterLevel };

      shader.vertexShader = `
        uniform float uJitterLevel;
        ${shader.vertexShader}
      `.replace(
        `#include <project_vertex>`,
        `
          vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
          gl_Position = projectionMatrix * mvPosition;

          gl_Position.xy /= gl_Position.w;
          gl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `
        vec4 diffuseColor = vec4( diffuse, opacity );
        diffuseColor.rgb *= 0.8; // Little darker colors
        `
      );
    }
  };

  export default createCustomMaterial