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
import { Suspense , createContext, useContext, useRef} from "react";
import "./main.css";
import { Physics,Debug } from "@react-three/cannon";
import Person from "./components/Person";
import {
  EffectComposer,
  Pixelation,
  
} from "@react-three/postprocessing";
import { useState, useEffect} from "react";
import DarkWindow from "./components/darkModal";
import CubeLoader from "./components/CubeLoader";
  import SkyImage from "../public/sky/sphere.jpg"
import SkySphere from "./utils/skySpehere.tsx";
import HeadBob from "./utils/headbob.tsx";
import PhoneModal from "./components/PhoneModal.tsx";

interface CurrentObject {
  ref: THREE.Mesh;
  textDescription: string;
  tag:string | null;
}



function App() {
  extend(THREE);

  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  useEffect(() => {
    // Function to check screen resolution
    const checkScreenResolution = () => {
      if (window.innerWidth < 768) {
        setIsScreenTooSmall(true);
      } else {
        setIsScreenTooSmall(false);
      }
    };

    // Initial check
    checkScreenResolution();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenResolution);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkScreenResolution);
    };
  }, []);

  if (isScreenTooSmall) {
    return (
      <div style={screenTooSmallStyle}>
        <h1>Screen Resolution Too Small</h1>
        <p>This experience cannot be played at the current resolution.</p>
      </div>
    );
  }

  const [textDesc, setTextDesc] = useState('Welcome to my three js project, it took me a while to actually finish this due to my schedcule and obligitions but I can say that this is complete. Orignally this was supposed to be a ps1 type site by emulating the actual graphics but I realized half way through that it would be a much harder task. I would first like to thank Eloi Pins')
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


  useEffect(() => {

  }, [])

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

  // Close modal
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
    {/* <indexContext.Provider value={index}> */}
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

    </>
  );
}

// Styles for the "Screen Too Small" message
const screenTooSmallStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  zIndex: 1000,
};

createRoot(document.getElementById("root")!).render(<App />);
