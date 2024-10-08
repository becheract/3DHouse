import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { vertexShader } from "./vertexShader";
import { fragmentShader } from "./fragmentShader";
import { useRef } from "react";

class CustomShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        resolution: { value: new THREE.Vector2(320, 240) },
        map: { value: null },
      },
    });
  }
}

extend({ CustomShaderMaterial });

const CustomShaderMaterialComponent = (props: any) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  useFrame(() => {
    if (materialRef.current) materialRef.current.uniforms.map.value = props.map;
  });

  return (
    <customShaderMaterial ref={materialRef} attach="material" {...props} />
  );
};

export default CustomShaderMaterialComponent;
