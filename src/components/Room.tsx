import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import {
  useBox,
  usePlane,
  PlaneProps,
  BoxProps,
  useSphere,
} from "@react-three/cannon";
import Fanshawe from "./Fanshawe"  
import MonitorOld from "./monitor_old"
import floorTextureAsset from "../assets/floor.png";
import wallTextureAsset from "../assets/wally.webp";
import ceilTextureAsset from "../assets/ceil2.png";
import Door from "./Door"
import Bed from "../components/Bed";
import Fan from "../components/Fan";
import Bookcase from "../components/Bookcase";
import Magazines from "./Magazines";
import Plant from "./Plant_1";
import Plant_2 from "../components/Plant_2";
import Plant_3 from "../components/Plant_3";
import Plant_4 from "../components/Plant_4";
import Plant_5 from "../components/Plant_5";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import Phone from "../components/Phone"
import Painting_1 from "../components/Painting_1";
import Painting_2 from "../components/Painting_2";
import Painting_3 from "../components/Painting_3";
import Painting_4 from "../components/Painting_4";
import Painting_5 from "../components/Painting_5";
import Circuit from "./Circuit"
import Chair from "./Chair";
import Monitor from "./Monitor";
import Cup from "./Cup";
import Table from "./Table";
import Garbage from "./Garbage";
import Bike from "./Bicycle";
import Radio from "./Radio";
import TV_Table from "./Tv_table";
import Sofa from "./Sofa";
import TV from "./Tv";
import Vent from "./Vent";
import Shelf from "./Shelf";
import BreakableTable from "./Table_breakable";
import Project from "./Project";
import Desktop from "./Desktop"
import Police from "./Police"
// import CustomShaderMaterial from "../../shaders/CustomShaderMaterial";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";
import Paint from "./Paint"
import Cart from "./Cart"
import Skyrim from "./Skyrim"
import Fn from "./Fn"
import Mario from "./Mario"
import Keyboard from "./Keyboard"
import Mouse from "./Mouse.tsx"
import Backpack from "./Backpack.tsx";
function Room(props: {
  handleHover: (value: boolean) => void;
  position: [number, number, number];
  openModal: (ref: THREE.Mesh, textDescription: string, tag: string | null) => void;
  closeModal: () => void;
}) {
  const floorTexture = useLoader(THREE.TextureLoader, floorTextureAsset);
  const wallTexture = useLoader(THREE.TextureLoader, wallTextureAsset);
  const ceilTexture = useLoader(THREE.TextureLoader, ceilTextureAsset);

  // Configure texture wrapping and repeating
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(15, 15); // Set texture repeat for a tiled floor
  floorTexture.magFilter = THREE.NearestFilter;
  floorTexture.minFilter = THREE.NearestFilter;
  floorTexture.generateMipmaps = false;

  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10, 10); // Set texture repeat for a tiled floor
  wallTexture.magFilter = THREE.NearestFilter;
  wallTexture.minFilter = THREE.NearestFilter;
  wallTexture.generateMipmaps = false;

  ceilTexture.wrapS = THREE.RepeatWrapping;
  ceilTexture.wrapT = THREE.RepeatWrapping;
  ceilTexture.repeat.set(1, 1); // Set texture repeat for a tiled ceil
  ceilTexture.magFilter = THREE.NearestFilter;
  ceilTexture.minFilter = THREE.NearestFilter;
  ceilTexture.generateMipmaps = false;

  useEffect(() => {
    // Set filtering for magnification (when zooming in)
    wallTexture.magFilter = THREE.NearestFilter;

    // Set filtering for minification (when zooming out)
    wallTexture.minFilter = THREE.LinearMipMapLinearFilter;

    // Enable mipmaps for better minification
    wallTexture.generateMipmaps = true;
    wallTexture.needsUpdate = true;
  }, [wallTextureAsset]);

  // Apply texture filtering on load
  useEffect(() => {
    // Set filtering for magnification (when zooming in)
    floorTexture.magFilter = THREE.NearestFilter;

    // Set filtering for minification (when zooming out)
    floorTexture.minFilter = THREE.LinearMipMapLinearFilter;

    // Enable mipmaps for better minification
    floorTexture.generateMipmaps = true;
    floorTexture.needsUpdate = true;
  }, [floorTextureAsset]);

  // Static floor using usePlane
  const [floorRef] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Horizontal floor
    position: [0, 0, 0], // Centered floor
  }));

  // Static walls using useBox
  const [wallRef1] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [-5, 5, 0], // Left wall
    args: [1, 10, 10], // Thin vertical wall
  }));

  const [wallRef2] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [5, 5, 0], // Right wall
    args: [1, 10, 10],
  }));

  const [wallRef3] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [0, 5, -5], // Back walla
    args: [10, 10, 1],
  }));

  // const [wallRef4] = useBox<THREE.Mesh>(() => ({
  //   type: "Static",
  //   position: [0, 5, 5.5], // front wall
  //   args: [10, 10, 1],
  // }))

  const [ceilingRef] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [0, 5, 0], // Ceiling
    args: [20, 1, 20], // Thin horizontal ceiling
  }));


  useEffect(() => {
    // Dispose textures when component unmounts to free memory
    return () => {
      floorTexture.dispose();
      wallTexture.dispose();
    };
  }, []);

  return (
    <>
      {/* Static Floor */}
      <mesh ref={floorRef}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#FCFBF4" map={floorTexture} />
      </mesh>
      {/* Static Left Wall */}
      <mesh ref={wallRef1}>
        <boxGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#FCFBF4" map={wallTexture} />
      </mesh>

      {/* Static Right Wall */}
      <mesh ref={wallRef2}>
        <boxGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#FCFBF4" map={wallTexture} />
      </mesh>

      {/* Static Back Wall */}
      <mesh ref={wallRef3}>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="#FCFBF4" map={wallTexture} />
      </mesh>

           {/* Static Front Wall
        <mesh ref={wallRef4}>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="#FCFBF4" map={wallTexture} />
      </mesh>  */}


      {/* Static Ceiling */}
      <mesh ref={ceilingRef}>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>


      {/* Fan */}
      <Fan position={[3, 3.5, -16]} rotation={[0, 1.6, 0]} castShadow />
      {/* Bed */}
      <Bed position={[7, 0, 8]} rotation={[0, -1.56, 0]} scale={1.3} />
      {/* Bookcase */}
      <Bookcase
        position={[21.5, 0, -7]}
        rotation={[0, 0, 0]}
        scale={[1.6, 1.6, 1]}
      />
      {/* Plant */}
      <Plant_4 position={[6, 0.2, -0.7]} />

      <Plant_2 position={[12.3, 1.72, -10]} />
      <Plant_5 position={[13.8, 0.2, 0.7]} />

      <Plant_5 position={[6, 0.2, -2.2]} />
      {/* <MonitorOld position={[0,2,0]} scale={.8}/> */}
      {/* Painting */}
      <Painting_1 position={[1.9, 1.5, 16.19]} rotation={[0, 4.58, 0]} />
      <Painting_2 position={[0,0,0 ]} rotation={[0, 0, 0]} />
      <Painting_5 position={[-4.70, 1.5, -7.66]} rotation={[0, 1.58, 0]} />

      {/* Chair */}
      <Chair position={[0, 1, -2]} />

    
      {/* Cup */}
      <Cup position={[9.2, 1.55, -15]} />
      <Door position={[-4.5, 1.3, -1.8]} scale={1.3} rotation={[0,1.54,0]}/>
      {/* Table */}
      <Table position={[13, 2, -16.7]} />
      {/* Bike */}
      <Bike position={[3.8, 0, -4]} scale={0.5} rotation={[0, 0, -0.2]} />
      {/* Magazines */}
      <Magazines position={[-16, 0, -4]} />
      {/* Garabage */}
      <Garbage position={[19, 1.6, -21.5]} scale={0.7} />
      {/* Radio */}
      
      <Radio position={[2.3, 2.55 , 15.1]} rotation={[0, 2, 0]} handleHover={props.handleHover}/>
      {/*Tv Table */}
      <TV_Table
        position={[-5.5, 1.2, -3.5]}
        scale={0.5}
        rotation={[0, 1.58, 0]}
      />

      <Desktop position={[-2, 0, -3.5 ]} scale={0.5} rotation={[0,-1.6,0]}/>
      <Keyboard position={[0.2, 1.5, -3.8 ]}/>
      <Mouse position={[0.2, 1.5, -3.8 ]}/>
      {/* Sofa rotation={[0, 1.6, 0]} */}
      <Sofa position={[-0.7, 0.7, 3]}  scale={1.5} rotation={[0, 1.6, 0]}/>
      {/* TV */}
      <TV position={[-1.3, 1.8, 16.3]} rotation={[0, 4.7, 0]} scale={0.5} />
      {/* Fan */}
      <Vent position={[9.5, 0.09, -1]} />
      {/* Shelf */}
      <Shelf position={[9.9, 0.3, 23.7]} scale={1.3} rotation={[0, -1.56, 0]} />

        {/* Monitor */}
        <Monitor
                //  handleHover={props.handleHover}
                //  openModal={props.openModal}
                //  closeModal={props.closeModal}
        position={[0.1, 1.3, -3.7]}
        rotation={[0, 3.1, 0]}
      />
      
      {/* projects on shelf */}
      <Project
        tag="top"
        textDescription="An Arduino water irragtaion project that I had worked on during the summer of 2024 for my dad's greenhouse"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.68]}
        >
          <Cart scale={0.05} position={[0,-0.13,0]}/>
          </Project>

      <Project
        tag="top"
        textDescription="An Arduino water irragtaion project that I had worked on during the summer of 2024 for my dad's greenhouse"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0]}
      >
      <Circuit scale={0.15}/>
        </Project>

    <Project
        tag="top"
        textDescription="A redesign of my second portfolio site made using Next.js, typescript, sanity headless seo. I really put in effort when it
        came to the design aspect."
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, -1, 1.2]}
      > 
      <Paint scale={0.04}  rotation={[4, 0, 2]}/>
      </Project>

      <Project
        tag="middle"
        textDescription="Skyrim"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[-0, 0, 1.2]}
      > 
      <Fanshawe scale={0.05} position={[0,-0.45,0]} />
      </Project>


      <Project
        tag="middle"
        textDescription="Ontario Police College"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0]}

      > 
      <Police scale={0.05} position={[0,-0.45,0]}/>
      </Project>


      <Project
        tag="middle"
        textDescription="Steamlabs"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.65]}

      > 
      <Plant_3 scale={0.05} position={[0,-0.45,0]}/>
      </Project>

      <Project
        tag="lower"
        textDescription="Ontario Police College"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0]}

      > 
      <Skyrim scale={0.10} position={[0,-0.94,0]}/>
      </Project>

        <Backpack position={[5.6,0,-2]} rotation={[0,2,0]}/>

      <Project
          tag="lower"
        textDescription="Fallout new vegas"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[-0, 0, 1.2]}
      > 
      <Fn scale={0.10} position={[0,-0.94,0]} />
      </Project>

      {/* projects on shelf */}
      <Project
        tag="lower"
        textDescription="Mario Kart"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.68]}
        >
          <Mario scale={0.10} position={[0,-0.94,-0.04]} />
        </Project>


 
      <Phone openModal={props.openModal}  position={[0, 0.4, 0]} scale={0.1}/>
     
      </>
  );
}

export default Room;
