import * as THREE from "three";
import { createRoot } from "react-dom/client";
import { Canvas, extend,  } from "@react-three/fiber";
import {
  PointerLockControls,
  Stats,
  BakeShadows
} from "@react-three/drei";
import Room from "./components/Room";
import { Suspense ,useRef} from "react";
import "./main.css";
import { Physics } from "@react-three/cannon";
import Person from "./components/Person";
import {
  EffectComposer,
  Pixelation,
  
} from "@react-three/postprocessing";
import { useState, useEffect} from "react";
import DarkWindow from "./components/darkModal";
import CubeLoader from "./components/CubeLoader";

import HeadBob from "./utils/headbob.tsx";
import PhoneModal from "./components/PhoneModal.tsx";

interface CurrentObject {
  ref: THREE.Mesh;
  textDescription: string;
  tag:string | null;
}



function App() {
  extend(THREE);


  const [textDesc] = useState('Welcome to my three js project, it took me a while to actually finish this due to my schedcule and obligitions but I can say that this is complete. Orignally this was supposed to be a ps1 type site by emulating the actual graphics but I realized half way through that it would be a much harder task. I would first like to thank Eloi Pins')
  const [hover, setHover] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentObject, setCurrentObject] = useState<CurrentObject | null>(
    null!
  );
  const [phoneModal, setPhoneModal] = useState(true)

  function isDevToolsOpen() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    return widthThreshold || heightThreshold;
  }
  
  if (isDevToolsOpen()) {
    console.warn = () => {};
    window.alert = () => {};
  }



  const radio = [
    { name: "mirage", url: "/Radio/mirage.mp3" },
    { name: "luvr roq", url: "/Radio/luvr_roq_2k252.mp3" },
    { name: "ok ok ok", url: "/Radio/ok_ok_ok.mp3" },
    { name: "adidas girl", url: "/Radio/adidas_girl_2k25update.mp3" },
  ];

  const radioIndex = useRef(0);
  const radioName = useRef(radio[radioIndex.current].name);
  const [displayName, setDisplayName] = useState(radioName.current); // Only for UI
  

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") {
        radioIndex.current = (radioIndex.current + 1) % radio.length;
      } else if (e.key === "e" || e.key === "E") {
        radioIndex.current = (radioIndex.current - 1 + radio.length) % radio.length;
      } else {
        return;
      }
  
      radioName.current = radio[radioIndex.current].name;
      setDisplayName(radioName.current); // Re-render just this part
    };
  
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);
  


  // Open modal when cube is clicked
  const openModal = (ref: THREE.Mesh, textDescription: string , tag: string | null) => {
    if(tag !== null){
      setCurrentObject({ ref: ref, textDescription: textDescription, tag: tag });
      setModalOpen(true);
    }else if (tag == null){
      setCurrentObject({ ref: ref, textDescription: textDescription, tag : null});
      setModalOpen(true);
    }

  };

  const openPhoneModal = () => {
    setPhoneModal(true)
    
  }

  // Close modalß
  const closeModal = () => {
    setModalOpen(false);
  };

  const closePhoneModal = () => {
    setPhoneModal(false)
  }

  const handleHover = (value: boolean): void => {
    setHover(value);
  };

  return (
    <>
      <Canvas
        performance={{ min: 0.5 }}
        shadows
        id={"canvas"}
        tabIndex={0}
        frameloop="demand"
        gl={{
          antialias:false
        }}
      >
      <BakeShadows />
        <Stats />


        <EffectComposer>
          <Pixelation granularity={6} />

          <Suspense fallback={<CubeLoader />}>
            <Physics >

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
                openPhoneModal={openPhoneModal}
                closePhoneModal={closePhoneModal}
              />

              <Person
                controls
                isOpen={isModalOpen}
                position={[0, 0, 5]}
                args={[0.5]}
                color="yellow"
              />
      
        <HeadBob />
            </Physics>
 
          </Suspense>
        </EffectComposer>
      </Canvas>
      <DarkWindow
        currentObject={currentObject}
        isOpen={isModalOpen}
        handleHover={handleHover}
      />
      
      {phoneModal ? <>
        <PhoneModal isOpen={phoneModal} openPhoneModal={openPhoneModal} onClose={closePhoneModal} textDescription={textDesc}/>
      </>
      :
      null}
      
      {hover ? <h1 className="interaction">Interact </h1> : null}
      
      <div className="dot" />

      <div className="radio">
        <h1>Now Playing {displayName}</h1>
      </div>


      <div className="menu">
        <h1>Press C to open Menu</h1>
      </div>

    </>
  );
}


createRoot(document.getElementById("root")!).render(<App />);
