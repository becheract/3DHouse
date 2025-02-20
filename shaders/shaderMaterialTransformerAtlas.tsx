import { vertexShader } from "./atlasVertex";
import { fragmentShader } from "./atlasFrag";
import * as THREE from "three";

const shaderMaterialTransformer = (material: THREE.MeshBasicMaterial, uvScale: number) => {
  const lightPosition = new THREE.Vector3(0, 5, 0);
  const lightColour = new THREE.Color(1, 1, 1);
  const ambientColour = new THREE.Color(0.1, 0.1, 0.1);

  const tileX = 2; // Example: second tile in a 4x4 grid
const tileY = 1; // Example: second row

const tilesPerRow = 4; // Assuming 4 tiles per row
const tilesPerColumn = 4; // Assuming 4 rows

const atlasOffset = new THREE.Vector2(tileX / tilesPerRow, tileY / tilesPerColumn);
const atlasScale = new THREE.Vector2(1 / tilesPerRow, 1 / tilesPerColumn);


  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: material.map }, // Texture from the input material
      uvScale: { value: uvScale }, // Control UV scaling
      lightPosition: { value: lightPosition }, // Light position uniform
      // lightColour: { value: lightColour }, // Uncomment if needed
      // ambientColour: { value: ambientColour }, // Uncomment if needed
      atlasOffset: { value:atlasOffset }, // Offset in the atlas
      atlasScale: { value:atlasScale }, // Scale for tiles in the atlas
      uJitterLevel: { value: 80 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  return shaderMaterial;
};

export default shaderMaterialTransformer;