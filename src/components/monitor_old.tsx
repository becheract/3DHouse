import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Model(props : JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('Monitor_old/monitor.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Monitor as THREE.Mesh).geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('/monitor.glb')
