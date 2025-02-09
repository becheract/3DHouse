import { vertexShader } from "./vertexShader";
import { fragmentShader } from "./fragmentShader";
import * as THREE from "three";


const shaderMaterialTransformer = (material : THREE.MeshBasicMaterial, uvScale : number) => {
const lightPosition = new THREE.Vector3(0, 5, 0)
const lightColour = new THREE.Color(1, 1, 1)
const ambientColour = new THREE.Color(0.1, 0.1, 0.1) 

    // const shaderMaterial = new THREE.ShaderMaterial({
    //     uniforms: {
    //       map: { value: material.map }, // No texture for the frame, adjust if needed
    //       uvScale: { value: uvScale }, // Control UV scaling if necessary
    //       lightPosition: {value: lightPosition},
    //       // lightColour: {value: lightColour},
    //       // ambientColour: {value: ambientColour}
    //     },
    //     vertexShader: vertexShader,
    //     fragmentShader: fragmentShader,
    //   });

          const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
              map: { value: material.map }, // No texture for the frame, adjust if needed
              uvScale: { value: uvScale  }, // Control UV scaling if necessary
              uJitterLevel: { value: 60 },
              lightPosition: {value: lightPosition},

            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
          });

      return shaderMaterial
}


export default shaderMaterialTransformer
