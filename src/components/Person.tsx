import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { usePlayerControls } from "../utils/helpers";
import * as THREE from "three";

// Define the type for props
interface BaseCharacterProps {
  controls?: boolean;
  position?: [number, number, number];
  color?: string;
  args?: [number]; // Adjust this based on the shape of args (for sphereGeometry)
}

// BaseCharacter component
const BaseCharacter = (props: BaseCharacterProps) => {
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();
  const SPEED = 5;

  const { camera } = useThree();

  // Define the ref with a specific type of THREE.Mesh
  const ref = useRef<THREE.Mesh>(null!);

  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
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

  // Frame-based movement logic
  useFrame(() => {
    // Update the camera position
    sphereRef.current?.getWorldPosition(camera.position);

    // Calculate movement direction based on controls
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
    if (jump && Math.abs(parseFloat(velocity.current[1].toFixed(2))) < 0.05) {
      api.velocity.set(velocity.current[0], 5, velocity.current[2]);
    }
  });

  return (
    <group>
      {/* Ensure the ref is typed correctly for the mesh */}
      <mesh castShadow position={props.position} ref={ref}>
        {/* <sphereGeometry args={props.args} /> */}
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
    </group>
  );
};

export default BaseCharacter;
