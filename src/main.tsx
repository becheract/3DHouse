import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { Canvas, extend,  } from "@react-three/fiber";
import {
  PointerLockControls,
  Sky,
  Stats,
  AdaptiveDpr
} from "@react-three/drei";
import Room from "./components/Room";
import { Suspense} from "react";
import "./main.css";
import { Physics,Debug } from "@react-three/cannon";
import Person from "./components/Person";
import {
  EffectComposer,
  Pixelation,
  
} from "@react-three/postprocessing";
import { useState } from "react";
import DarkWindow from "./components/darkModal";
import CubeLoader from "./components/CubeLoader";
  import SkyImage from "../public/sky/sphere.jpg"
import SkySphere from "./utils/skySpehere.tsx";
import HeadBob from "./utils/headbob.tsx";
import { Text } from "@react-three/drei";


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
      <Canvas
        dpr={[4, 138]}
        shadows
        id={"canvas"}
        tabIndex={0}
        frameloop="demand"
        gl={{
          antialias:false
        }}
      >

        {/* allows for higer fps compared to dpr above */}
        {/* <AdaptiveDpr pixelated /> */}

        <Stats />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />

        <SkySphere textureUrl={SkyImage}/>

        <EffectComposer>
          <Pixelation granularity={10} />

          <Suspense fallback={<CubeLoader />}>
            <Physics >
            <Debug color="green" scale={1.1}>

              {/* Lights */}
              <directionalLight position={[0, 0, 0]} intensity={1} castShadow />
              <ambientLight position={[0, 0, 0]} intensity={1} castShadow />
              {/* <BakeShadows /> */}
              {/* <spotLight penumbra={1} position={[-10, 1, 0]} castShadow /> */}

              <pointLight position={[0, 5, 0]} intensity={10} />
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
                isOpen={isModalOpen}
                position={[0, 0, 5]}
                args={[0.5]}
                color="yellow"
              />
      
      <HeadBob />
        </Debug>
            </Physics>
 
          </Suspense>
        </EffectComposer>
      </Canvas>
      <DarkWindow
        currentObject={currentObject}
        isOpen={isModalOpen}
        onClose={closeModal}
        handleHover={handleHover}
      />

      {hover ? <h1 className="interaction">Interact </h1> : null}
      <div className="dot" />

      <div className="radio">
        <h1>Now Playing </h1>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
