import React, { useState, useRef } from "react";
import { useGLTF, CycleRaycast, Text } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import {
  useBox,
  usePlane,
  PlaneProps,
  BoxProps,
  useSphere,
} from "@react-three/cannon";

interface projects {
  textDescription: string;
  handleHover: (value: boolean) => void;
  openModal: (ref: THREE.Mesh, text: string) => void;
  closeModal: () => void;
}

export default function Project(props: projects) {
  const [hover, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);

  const [bodyRef] = useBox<THREE.Group>(() => ({
    type: "Dynamic",
    position: [4.2, 0, 0.1],
  }));

  const { camera } = useThree();
  const distanceThreshold = 3;

  // Float parameters
  const floatAmplitude = 0.1; // How high the cube will float
  const floatSpeed = 2; // Speed of the floating motion

  const distanceChecker = () => {
    if (bodyRef.current) {
      if (hover == false) {
        if (
          camera.position.z <=
          bodyRef.current.position.z + distanceThreshold
        ) {
          console.log("can interact with");

          props.handleHover(true);
          setHover(true);
        } else {
          meshRef.current.rotation.set(0, 0, 0);
          props.handleHover(false);
          setHover(false);
        }
      } else if (hover == true) {
        props.handleHover(false);
        setHover(false);
      }
    }
  };



  //interactions
  useFrame((state) => {
    if (hover == true && meshRef.current) {
      meshRef.current.rotation.y += 0.01;

      console.log(hover);

      document.addEventListener("keydown", (e) => {
        if (e.key == "f" || (e.key == "F" && meshRef.current)) {
          console.log("interacting");
          props.openModal(meshRef.current, props.textDescription);
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key == "x" || e.key == "X") {
        props.closeModal();
      }
    });

    // Calculate new Y position based on a sine wave for floating effect
    const time = state.clock.getElapsedTime(); // Get elapsed time
    meshRef.current.position.y =
      2.2 + floatAmplitude * Math.sin(floatSpeed * time); // Floating effect
  });

  return (
    <group ref={bodyRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          console.log("hovering over object");
          setHover(true);
          distanceChecker();
        }}
        onPointerLeave={(e) => {
          console.log("no longer hovering");
          setHover(false);
          distanceChecker();
        }}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} attach={"geometry"} />
        <meshStandardMaterial flatShading color={"red"} />
      </mesh>
    </group>
  );
}
