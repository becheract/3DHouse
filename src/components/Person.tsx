import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef,useState } from "react";
import { usePlayerControls } from "../utils/helpers";
import * as THREE from "three";
import Particle from "./Particle";
import { CameraShake } from "@react-three/drei";
import Arms from "./Arms";
// Define the type for props
interface BaseCharacterProps {
  controls?: boolean;
  isOpen: boolean;
  position?: [number, number, number];
  color?: string;
  args?: [number]; // Adjust this based on the shape of args (for sphereGeometry)
}


interface ShakeController {
  getIntensity: () => number
  setIntensity: (val: number) => void
}



// BaseCharacter component
const BaseCharacter = (props: BaseCharacterProps) => {
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();
  const SPEED = 5;
  let lastTime = 0;
  const fps = 30;
  
  const { camera , gl } = useThree();
  
  // gl.shadowMap.enabled = true;
  camera.near = 0.01; // Move near plane closer
  camera.updateProjectionMatrix(); // Make sure to update the matrix after the change
  // Define the ref with a specific type of THREE.Mesh
  const ref = useRef<THREE.Mesh>(null!);
  const armsRef = useRef<THREE.Mesh>(null);

  const [sphereRef, api] = useSphere(() => ({
    mass: 3,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  // Destructure movement controls from custom hook
  const { forward, backward, left, right, jump } = usePlayerControls();

  // useRef to track velocity
  const velocity = useRef([0, 0, 0]);

  // Subscribe to velocity updates and store in the ref
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
    return () => unsubscribe();
  }, [api.velocity]);

  useFrame((state) => {
    if (props.isOpen == false) {
      const delta = state.clock.getElapsedTime() - lastTime;
      if (delta > 1 / fps) {
        lastTime = state.clock.getElapsedTime();

        const spherePos = new THREE.Vector3();
        // Update the camera position
        sphereRef.current?.getWorldPosition(spherePos);

        // Update the camera to follow the player
        camera.position.set(spherePos.x, spherePos.y + 1.5, spherePos.z);

        if (armsRef.current !== null) {
       // Calculate the forward direction (ignoring camera's X-axis rotation)
        const forwardDirection = new THREE.Vector3(
          Math.sin(camera.rotation.y), // X component (yaw)
          0, // Lock the Y-axis
          Math.cos(camera.rotation.y) // Z component (yaw)
        ).normalize();

        // Define the offset for the arms (relative to the camera)
        const offset = new THREE.Vector3(0, -1.8, 0.03);

        // Calculate the arms' position
        const armsPosition = new THREE.Vector3()
          .copy(camera.position)
          .add(forwardDirection.multiplyScalar(offset.z)) // Apply only horizontal offset
          .add(new THREE.Vector3(0, offset.y, 0)); // Add vertical offset

        armsRef.current.position.copy(armsPosition);

        // Copy only the camera's yaw (Y-axis rotation) to the arms
        const armsRotation = new THREE.Euler(0, camera.rotation.y, 0); // Lock pitch and roll
        armsRef.current.quaternion.setFromEuler(armsRotation);

      }
        

        // Calculate the movement direction based on controls (AWSD)
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);

        // Combine direction vectors
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(SPEED)
          .applyEuler(camera.rotation);

        speed.fromArray(velocity.current);

        // Set velocity based on the direction
        api.velocity.set(direction.x, velocity.current[1], direction.z);

        // Jump logic
        if (
          jump &&
          Math.abs(parseFloat(velocity.current[1].toFixed(2))) < 0.05
        ) {

            api.velocity.set(velocity.current[0], 5, velocity.current[2]);
          
        }
      }
    }
  });

  return (
    <group>
      {/* Ensure the ref is typed correctly for the mesh */}
      <mesh castShadow position={props.position} ref={armsRef}>
        {/* <sphereGeometry args={props.args} /> */}
        <meshStandardMaterial color="#FFFF00" />
        <Arms scale={[1, 1, 1]} rotation={[0, 3.1, 0]} />
        {/* <CameraShake ref={shakeRef}/> */}
      </mesh>
    </group>
  );
};

export default BaseCharacter;
