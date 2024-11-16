import React, { useState, useRef, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

interface Projects {
  textDescription: string;
  handleHover: (value: boolean) => void;
  openModal: (ref: THREE.Mesh, text: string) => void;
  closeModal: () => void;
}

export default function Project(props: Projects) {
  const hoverRef = useRef(false); // Use a ref to track hover state
  const meshRef = useRef<THREE.Mesh>(null!);
  const [bodyRef] = useBox<THREE.Group>(() => ({
    type: "Dynamic",
    position: [4.2, 0, 0.1],
  }));
  const { camera } = useThree();

  const floatAmplitude = 0.1;
  const floatSpeed = 2;

  useEffect(() => {
    // Key event listener function
    const keyDownListener = (e: KeyboardEvent) => {
      if (distanceChecker() && hoverRef.current) {
        if (e.key === "f" || e.key === "F") {
          props.openModal(meshRef.current, props.textDescription);
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
    // Rotate if hovering
    if (hoverRef.current && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }

    // Floating effect
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y =
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

  return (
    <group ref={bodyRef}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          if (distanceChecker()) {
            hoverRef.current = true;
            props.handleHover(true);
          }
        }}
        onPointerLeave={() => {
          hoverRef.current = false;
          props.handleHover(false);
        }}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} attach={"geometry"} />
        <meshStandardMaterial flatShading color={"red"} />
      </mesh>
    </group>
  );
}
