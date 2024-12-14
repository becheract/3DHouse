import { vertexShader } from "./vertexShader";
import { fragmentShader } from "./fragmentShader";
import * as THREE from "three";


const shaderMaterialTransformer = (material : THREE.MeshBasicMaterial, uvScale : number) => {

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: material.map }, // No texture for the frame, adjust if needed
          uvScale: { value: uvScale }, // Control UV scaling if necessary
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      return shaderMaterial
}


export default shaderMaterialTransformer
