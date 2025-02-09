import { vertexShader } from "./atlasVertex";
import { fragmentShader } from "./atlasFrag";
import * as THREE from "three";

const shaderMaterialTransformer = (material: THREE.MeshBasicMaterial, uvScale: number) => {
  const lightPosition = new THREE.Vector3(0, 5, 0);
  const lightColour = new THREE.Color(1, 1, 1);
  const ambientColour = new THREE.Color(0.1, 0.1, 0.1);

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: material.map }, // Texture from the input material
      uvScale: { value: uvScale }, // Control UV scaling
      lightPosition: { value: lightPosition }, // Light position uniform
      // lightColour: { value: lightColour }, // Uncomment if needed
      // ambientColour: { value: ambientColour }, // Uncomment if needed
      uTileOffset: { value: new THREE.Vector2(0.0, 0.0) }, // Offset in the atlas
      uTileScale: { value: new THREE.Vector2(0.25, 0.25) }, // Scale for tiles in the atlas
      uJitterLevel: { value: 80 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  return shaderMaterial;
};

export default shaderMaterialTransformer;