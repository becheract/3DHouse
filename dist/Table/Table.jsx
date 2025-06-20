/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 table.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/table.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-12.719, -0.822, 12.96]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.Cube093.geometry} material={materials.Wood_05} />
        <mesh geometry={nodes.Cube093_1.geometry} material={materials.Wood_02} />
      </group>
    </group>
  )
}

useGLTF.preload('/table.glb')
