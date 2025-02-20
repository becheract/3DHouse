import React, { useEffect, useRef } from "react";
import { useGLTF,Html } from "@react-three/drei";
import * as THREE from "three";
import { Euler, useFrame, useThree, Vector3 } from "@react-three/fiber";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";
import Portfolio from "./Portfolio";
import { Triplet, useBox } from "@react-three/cannon";

interface Computer {
  handleHover: (value: boolean) => void;
  openModal: (ref: THREE.Mesh, text: string) => void;
  closeModal: () => void;
  position: Triplet | undefined;
  rotation: Triplet | undefined;
}

export default function Model(props: Computer) {
  const { nodes, materials } = useGLTF("Monitor/monitor.glb");

  const monitorMaterial = materials.Electronics as THREE.MeshBasicMaterial;
  const monitorRef = useRef<THREE.Mesh>(null!);

  // Set up a render target for the cube's render texture
  const renderTarget = new THREE.WebGLRenderTarget(512, 512);
  // const emissorRef = useRef<THREE.Mesh>(null!);

 

    const hoverRef = useRef(false); // Use a ref to track hover state
    const meshRef = useRef<THREE.Mesh>(null!);

    const [bodyRef] = useBox<THREE.Group>(() => ({
      type: "Dynamic",
      position: props.position,
      rotation: props.rotation
    }));
    const { camera } = useThree();
  
    const floatAmplitude = 0.09;
    const floatSpeed = 2;
  
    useEffect(() => {
      // Key event listener function
      const keyDownListener = (e: KeyboardEvent) => {
        if (distanceChecker() && hoverRef.current) {
          if (e.key === "f" || e.key === "F") {
            props.openModal(meshRef.current, 'testing ');
          } else if (e.key === "x" || e.key === "X") {
            props.closeModal();
          }
        }
      };
  
      // Register key event listener once on mount
      document.addEventListener("keydown", keyDownListener);
      return () => {
        document.removeEventListener("keydown", keyDownListener);
      };
    }, []); // Empty dependency array ensures this runs only once
  
    useFrame((state) => {
      // Floating effect
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y =
        2.2 + floatAmplitude * Math.sin(floatSpeed * time);
      
        monitorRef.current.position.y =
        2.2 + floatAmplitude * Math.sin(floatSpeed * time);
    });
  
    const distanceChecker = (): boolean => {
      const distanceThreshold = 3;
      if (bodyRef.current) {
        const distanceToBody = camera.position.distanceTo(
          bodyRef.current.position
        );
        return distanceToBody <= distanceThreshold;
      }
      return false;
    };

  // useEffect(() => {
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
  // }, [materials, renderTarget.texture]);




  return (
   
<group   dispose={null} ref={bodyRef}>
     <group  scale={0.375} dispose={null} >
        <mesh
        ref={meshRef}
          geometry={(nodes.TV_04_1 as THREE.Mesh).geometry}
          material={materials.Electronics}
          onPointerOver={() => {
            if (distanceChecker()) {
              console.log('hovering over')
              hoverRef.current = true;
              props.handleHover(true);
            }
          }}
          onPointerLeave={() => {
            hoverRef.current = false;
            props.handleHover(false);
          }}
        />
        <mesh
        ref={monitorRef}
         geometry={(nodes.TV_04_2 as THREE.Mesh).geometry}
          position={[0,2,0]}
        >
        </mesh>
      </group>
      </group>
  );
}



useGLTF.preload("/monitor.glb");
