import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("Table/table.glb");

  const tableRef = useRef<THREE.Mesh>(null!);
  const legRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    const tableMaterial = materials.Wood_05 as THREE.MeshBasicMaterial;
    const legMaterial = materials.Wood_02 as THREE.MeshBasicMaterial;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: tableMaterial.map }, // No texture for the frame, adjust if needed
        uvScale: { value: 5 }, // Control UV scaling if necessary
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const shaderLegMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: legMaterial.map }, // No texture for the frame, adjust if needed
        uvScale: { value: 5 }, // Control UV scaling if necessary
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Loop through all materials and set NearestFilter for their textures
    Object.values(materials).forEach((material: THREE.Material) => {
      if (
        material instanceof THREE.MeshBasicMaterial ||
        material instanceof THREE.MeshStandardMaterial
      ) {
        if (material.map) {
          material.map.minFilter = THREE.NearestFilter;
          material.map.magFilter = THREE.NearestFilter;
          material.map.needsUpdate = true;
        }
      }
    });

    if (tableRef.current) {
      tableRef.current.material = shaderMaterial;
    }

    if (legRef.current) {
      legRef.current.material = shaderLegMaterial;
    }
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <group
        position={[-12.719, -0.822, 12.96]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <mesh
          ref={tableRef}
          geometry={(nodes.Cube093 as THREE.Mesh).geometry}
          material={materials.Wood_05}
        />
        <mesh
          ref={legRef}
          geometry={(nodes.Cube093_1 as THREE.Mesh).geometry}
          material={materials.Wood_02}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/table.glb");
