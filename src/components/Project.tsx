import React, { useState, useRef, useEffect } from "react";
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
  const { camera } = useThree(); // Correctly call useThree here
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Float parameters
  const floatAmplitude = 0.1; // How high the cube will float
  const floatSpeed = 2; // Speed of the floating motion

  //interactions
  useFrame((state) => {
    if (hover && meshRef.current) {
      meshRef.current.rotation.y += 0.01;

      // Use a ref to ensure event listeners are not re-registered
      const keyDownListener = (e: KeyboardEvent) => {
        if (distanceChecker() == true) {
          if (e.key === "f" || e.key === "F") {
            console.log("interacting");
            props.openModal(meshRef.current, props.textDescription);
          }
          if (e.key === "x" || e.key === "X") {
            props.closeModal();
          }
        }
      };

      document.addEventListener("keydown", keyDownListener);

      return () => {
        // Cleanup event listener
        document.removeEventListener("keydown", keyDownListener);
      };
    }
    // Calculate new Y position based on a sine wave for floating effect
    const time = state.clock.getElapsedTime(); // Get elapsed time
    meshRef.current.position.y =
      2.2 + floatAmplitude * Math.sin(floatSpeed * time); // Floating effect
  });

  const distanceChecker = (): boolean => {
    const distanceThreshold = 3;

    if (bodyRef.current) {
      const distanceToBody = camera.position.distanceTo(
        bodyRef.current.position
      );
      const isWithinThreshold = distanceToBody <= distanceThreshold;

      return isWithinThreshold;
    } else {
      return false;
    }
  };

  return (
    <group ref={bodyRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          console.log("hovering over object");
          if (distanceChecker() == true) {
            props.handleHover(true);
            setHover(true);
          }
        }}
        onPointerLeave={(e) => {
          console.log("no longer hovering");
          props.handleHover(false);
          setHover(false);
        }}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} attach={"geometry"} />
        <meshStandardMaterial flatShading color={"red"} />
      </mesh>
    </group>
  );
}
