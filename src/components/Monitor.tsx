import React, { useEffect, useRef } from "react";
import { useGLTF,Html } from "@react-three/drei";
import * as THREE from "three";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";
import Portfolio from "./Portfolio";

interface Computer {
  handleHover: (value: boolean) => void;
  openModal: (ref: THREE.Mesh, text: string) => void;
  closeModal: () => void;
  position: Vector3 | undefined;
  rotation: Euler | undefined;
}

export default function Model(props: Computer) {
  const { nodes, materials } = useGLTF("Monitor/monitor.glb");

  const monitorMaterial = materials.Electronics as THREE.MeshBasicMaterial;
  const monitorRef = useRef<THREE.Mesh>(null!);

  // Set up a render target for the cube's render texture
  const renderTarget = new THREE.WebGLRenderTarget(512, 512);
  const emissorRef = useRef<THREE.Mesh>(null!);

  // Create a secondary scene for the spinning cube
  const cubeScene = new THREE.Scene();
  const cubeCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  cubeCamera.position.z = 5;

  // Cube geometry and material
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // Green cube
  );
  cubeScene.add(cube);

  useEffect(() => {
    // const shaderMaterial = new THREE.ShaderMaterial({
    //   uniforms: {
    //     map: { value: monitorMaterial.map }, // No texture for the frame, adjust if needed
    //     uvScale: { value: 100 }, // Control UV scaling if necessary
    //   },
    //   vertexShader: vertexShader,
    //   fragmentShader: fragmentShader,
    // });

    // Set nearest filter for all materials of the model
    // Object.values(materials).forEach((material: THREE.Material) => {
    //   if (
    //     material instanceof THREE.MeshBasicMaterial ||
    //     material instanceof THREE.MeshStandardMaterial
    //   ) {
    //     if (material.map) {
    //       material.map.minFilter = THREE.NearestFilter;
    //       material.map.magFilter = THREE.NearestFilter;
    //       material.map.needsUpdate = true;
    //     }
    //   }
    // });

    // if (emissorRef.current) {
    //   // Create a new MeshBasicMaterial for the emissor with a white background
    //   const emissorMaterial = new THREE.MeshBasicMaterial({
    //     map: renderTarget.texture, // Set the render target texture to Emissor material
    //     color: 0xffffff, // Set background color to white
    //   });
    //   emissorRef.current.add(cubeScene)
    //   // Assign the material to the emissor mesh
    //   emissorRef.current.material = emissorMaterial;
    // }

    // if (monitorRef.current) {
    //   monitorRef.current.material = shaderMaterial;
    // }
  }, [materials, renderTarget.texture]);




  return (
    <group position={props.position} rotation={props.rotation} dispose={null}>
      <group position={[10.044, 0.458, 6.73]} scale={0.375}>
        <mesh
          // ref={monitorRef}
          geometry={(nodes.TV_04_1 as THREE.Mesh).geometry}
          material={materials.Electronics}
        />
        <mesh
          ref={emissorRef}
          geometry={(nodes.TV_04_2 as THREE.Mesh).geometry}
        >
        <Html className="content" rotation-y={3} position={[0, 0.05, -0.09]} transform occlude>
              <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                <Portfolio />
              </div>
            </Html>


        </mesh>
      </group>
    </group>
  );
}



useGLTF.preload("/monitor.glb");
