import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export function Model(props : JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('/mouse.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Mouse_Pad as THREE.Mesh).geometry}
        material={materials.Material}
        position={[-0.151, 0.211, -0.004]}
        scale={0.152}
      />
    </group>
  )
}

useGLTF.preload('/mouse.glb')