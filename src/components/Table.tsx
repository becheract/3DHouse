import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("Table/table.glb");

  useEffect(() => {

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


  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <group
        position={[-12.719, -0.822, 12.96]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <mesh
          geometry={(nodes.Cube093 as THREE.Mesh).geometry}
          material={materials.Wood_05}
        />
        <mesh
          geometry={(nodes.Cube093_1 as THREE.Mesh).geometry}
          material={materials.Wood_02}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/table.glb");
