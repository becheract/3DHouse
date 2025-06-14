/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Backpack.glb --transform 
Files: Backpack.glb [952.27KB] > /Users/bechera/Documents/3DHouse/public/Backpack/Backpack-transformed.glb [49.53KB] (95%)
*/

import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('Backpack/Backpack-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Backpack001 as THREE.Mesh).geometry} material={materials.Backpack} position={[-0.596, 0.312, -1.878]} rotation={[0, Math.PI / 2, 0]} scale={1.698} />
    </group>
  )
}

useGLTF.preload('/Backpack-transformed.glb')
