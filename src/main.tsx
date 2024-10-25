import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, Sky, BakeShadows } from "@react-three/drei";
import Room from "./components/Room";
import { Suspense, useEffect } from "react";
import "./main.css";
import { Physics } from "@react-three/cannon";
import Person from "./components/Person";
import { EffectComposer, Scanline, Noise } from "@react-three/postprocessing";
import { useState, useRef } from "react";
import PixelatedEffect from "./Pixelated";
import DarkWindow from "./components/darkModal";

interface CurrentObject {
  ref: THREE.Mesh;
  textDescription: string;
}

function App() {
  extend(THREE);
  const [hover, setHover] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentObject, setCurrentObject] = useState<CurrentObject | null>(
    null!
  );

  // Open modal when cube is clicked
  const openModal = (ref: THREE.Mesh, textDescription: string) => {
    setCurrentObject({ ref: ref, textDescription: textDescription });
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleHover = (value: boolean): void => {
    setHover(value);
  };

  return (
    <>
      <Canvas shadows id={"canvas"} tabIndex={0}>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />

        <EffectComposer>
          {/* <Scanline density={0.9999} /> */}
          {/* <Noise opacity={0.1} /> */}
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.8, 0]}>
              {/* Lights */}
              <ambientLight intensity={1} castShadow />
              <BakeShadows />
              {/* <spotLight penumbra={1} position={[1, 4, 1]} castShadow /> */}

              {/* <pointLight position={[1, 4, 1]} intensity={20} /> */}
              <PointerLockControls />

              {/* Box Component */}
              <Room
                position={[0, 0, 0]}
                handleHover={handleHover}
                openModal={openModal}
                closeModal={closeModal}
              />
              <Person
                controls
                position={[0, 0, 6]}
                args={[0.5]}
                color="yellow"
              />
            </Physics>
          </Suspense>
        </EffectComposer>
      </Canvas>
      <DarkWindow
        currentObject={currentObject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {hover ? <h1 className="interaction">Interact </h1> : null}
      <div className="dot" />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
