import  {  useRef, useEffect, ReactNode } from "react";
import * as THREE from "three";
import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

interface Projects {
  children: ReactNode;
  textDescription: string;
  tag: string | null;
  handleHover: (value: boolean) => void;
  openModal: (ref: THREE.Mesh, text: string, tag: string) => void;
  closeModal: () => void;
  position: Vector3 | undefined;
  radio? : boolean
}

export default function Project(props: Projects) {
  const hoverRef = useRef(false); // Use a ref to track hover state
  const meshRef = useRef<THREE.Mesh>(null!);
  const [bodyRef] = useBox<THREE.Group>(() => ({
    type: "Dynamic",
    position: [4.2, 0, 0.1],
  }));
  const { camera } = useThree();

  const floatAmplitude = 0.05;
  const floatSpeed = 2;

  useEffect(() => {
    // Key event listener function
    const keyDownListener = (e: KeyboardEvent) => {
      if (distanceChecker() && hoverRef.current) {
        if (e.key === "f" || e.key === "F") {
          if(props.tag !== null)
          setTimeout(() => props.openModal(meshRef.current, props.textDescription, props.tag!), 250);
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
    if(props.radio == true){

    }else if (hoverRef.current && meshRef.current ) {
      //this is causing an issue 
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
        position={props.position}
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
      >
        {props.children}
      </mesh>
    </group>
  );
}
