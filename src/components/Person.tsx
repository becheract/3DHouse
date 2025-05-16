import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef,useState } from "react";
import { usePlayerControls } from "../utils/helpers";
import HeadBob from "../utils/headbob";
import * as THREE from "three";
import Particle from "./Particle";

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
  const NORMAL_SPEED = 5;
  const CROUCH_SPEED = 2.5; // Reduced speed while crouching
  let lastTime = 0;
  const fps = 30;

  const { camera } = useThree();

  const armsRef = useRef<THREE.Mesh>(null);

  const [sphereRef, api] = useSphere(() => ({
    mass: 3,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  // State to track crouching
  const [isCrouching, setIsCrouching] = useState(false);

  useEffect(() => {
    if (armsRef.current && camera) {
      camera.add(armsRef.current);
      armsRef.current.position.set(0, -1.8, -0.05);
    }

    return () => {
      if (armsRef.current !== null) {
        camera.remove(armsRef.current);
      }
    };
  }, [camera]);

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
        sphereRef.current?.getWorldPosition(spherePos);

        // Update the camera to follow the player
        const cameraHeight = isCrouching ? 0.8 : 1.5; // Lower height when crouching

        camera.position.set(spherePos.x, spherePos.y + cameraHeight, spherePos.z);

        // Calculate the movement direction based on controls (AWSD)
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);

        // Combine direction vectors
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(isCrouching ? CROUCH_SPEED : NORMAL_SPEED) // Adjust speed
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

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
 
      if (e.key === "Control" ) {
       if (isCrouching == false) {
          console.log('crouch')
          setIsCrouching(true)
        } else{
        setIsCrouching(false)
      }
    }
  }

    const keyUpListener = (e : KeyboardEvent) =>{
      if (e.key === "Control" ) {
        if (isCrouching) {
          console.log("uncrouch");
          setIsCrouching(false);
        }
      }
    }

    document.addEventListener("keydown", keyDownListener);
    document.addEventListener("keyup", keyUpListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
      document.removeEventListener("keyup", keyUpListener);
    };
  }, [isCrouching]);



  return (
    <group>
      <mesh castShadow position={props.position} ref={armsRef}>
        <meshStandardMaterial color="#FFFF00" />
        <Arms scale={[1, 1, 1]} rotation={[0, 3.1, 0]} />
      </mesh>
    </group>
  );
};

export default BaseCharacter;
