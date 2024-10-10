import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { NearestFilter, LinearMipMapLinearFilter, Texture } from "three";
import * as THREE from "three";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { scene, materials } = useGLTF("Bed/Bed.gltf");

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

  useEffect(() => {
    // Traverse through the scene to find meshes and apply filters
    scene.traverse((child) => {
      // Type guard to ensure 'child' is a Mesh
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material;

        // Ensure the material is a THREE.Material
        if (material && (material as THREE.MeshStandardMaterial).map) {
          const texture: Texture = (material as THREE.MeshStandardMaterial)
            .map as Texture;

          // Apply NearestFilter for a pixelated, PS1-style look
          texture.magFilter = NearestFilter;
          texture.minFilter = LinearMipMapLinearFilter; // Or NearestFilter for more blockiness

          // Enable mipmaps for smoother downscaling (optional)
          texture.generateMipmaps = true;
          texture.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(scene.getObjectByName("bed_04") as THREE.Mesh).geometry}
        material={materials.bed_04}
        position={[-3.864, 0.254, 3.027]}
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/Bed.gltf");
