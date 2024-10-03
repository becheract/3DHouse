import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
} from "@react-three/drei";
import Room from "./components/Room";
import { Suspense } from "react";
import "./main.css";
import { Physics } from "@react-three/cannon";
import Person from "./components/Person";
function App() {
  extend(THREE);

  if (document) {
    //create a root
    // const root = createRoot(document.querySelector('canvas'))
  }

  function JitteredCamera() {
    useFrame((state) => {
      const { x, y, z } = state.camera.position;
      state.camera.position.set(
        Math.round(x * 10) / 10, // Reducing precision by rounding
        Math.round(y * 10) / 10,
        Math.round(z * 10) / 10
      );
      state.camera.updateProjectionMatrix();
    });

    return null; // No need to render anything
  }

  return (
    <Canvas>
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.8, 0]}>
          {/* Lights */}
          <ambientLight intensity={1} />
          <pointLight position={[1, 1, 1]} />
          <PointerLockControls />
          {/* Box Component */}
          <Room position={[0, 0, 0]} />
          <Person controls position={[0, 2, 0]} args={[1.5]} color="yellow" />
        </Physics>
      </Suspense>
    </Canvas>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
