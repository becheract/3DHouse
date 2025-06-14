/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Car5_Police.glb --transform 
Files: Car5_Police.glb [58.99KB] > /Users/bechera/Documents/3DHouse/public/police/Car5_Police-transformed.glb [10KB] (83%)
*/

import  { useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Model(props : JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('police/Car5_Police-transformed.glb')

  
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
    <group {...props} dispose={null} name='police car'>
      <mesh geometry={(nodes.Car5_Police as THREE.Mesh).geometry} material={materials.car5_police_mat} name="police" rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/Car5_Police-transformed.glb')
