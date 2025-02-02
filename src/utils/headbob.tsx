import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { usePlayerControls } from "./helpers";
import * as THREE from "three";

export default function HeadBob() {
  const { camera, scene } = useThree(); // Access Three.js camera and scene
  const cameraGroup = useRef<THREE.Group>(new THREE.Group()); // Wrap camera in a group
  const clock = useRef(new THREE.Clock()); // Time tracker

  const bobState = useRef({
    time: 0 ,
    isMoving: false,
    intensity: 0.1, // Vertical bob amount
    speed: 6, // Bobbing speed multiplier
    originalY: camera.position.y, // Initial camera Y position
  });

  const movement = usePlayerControls(); // Access movement controls

  useEffect(() => {
    // Add camera to the group and group to the scene
    cameraGroup.current.add(camera);
    scene.add(cameraGroup.current);

    const animate = () => {
      const delta = clock.current.getDelta(); // Time since last frame
      const bob = bobState.current;

      // Check if player is moving
      const isMoving =
        movement.forward || movement.backward || movement.left || movement.right;

      if (isMoving) {
        bob.time += delta * bob.speed; // Increment bobbing animation time
        const offset = Math.sin(bob.time) * bob.intensity;

        // Apply bobbing effect to the group position
        cameraGroup.current.position.y = bob.originalY + offset; // Vertical bobbing
        cameraGroup.current.position.x = Math.sin(bob.time / 2) * bob.intensity * 0.5; // Optional sway
        bob.isMoving = true;
      } else if (bob.isMoving) {
        // Reset position when movement stops
        cameraGroup.current.position.y = bob.originalY;
        cameraGroup.current.position.x = 0;
        bob.time = 0; // Reset time
        bob.isMoving = false;
      }

      requestAnimationFrame(animate); // Continue animation loop
    };

    animate(); // Start animation
    return () => {
      // Cleanup
      scene.remove(cameraGroup.current);
      cameraGroup.current.remove(camera);
    };
  }, [camera, scene, movement]);

  return null;
}
