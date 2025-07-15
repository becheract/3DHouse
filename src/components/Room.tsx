import * as THREE from "three";
import {  useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import {
  useBox,
  usePlane,

} from "@react-three/cannon";
import Fanshawe from "./Fanshawe"  
import floorTextureAsset from "../assets/floor.jpg";
import wallTextureAsset from "../assets/wally.webp";
import ceilTextureAsset from "../assets/ceil2.jpg";
import Door from "./Door"
import Bed from "../components/Bed";
import Fan from "../components/Fan";
import Bookcase from "../components/Bookcase";
import Magazines from "./Magazines";
import Plant_2 from "../components/Plant_2";
import Plant_3 from "../components/Plant_3";
import Plant_4 from "../components/Plant_4";
import Plant_5 from "../components/Plant_5";
import Phone from "../components/Phone"
import Painting_1 from "../components/Painting_1";
import Painting_2 from "../components/Painting_2";
import Painting_5 from "../components/Painting_5";
import Circuit from "./Circuit"
import Chair from "./Chair";
import Monitor from "./Monitor";
import Table from "./Table";
import Garbage from "./Garbage";
import Bike from "./Bicycle";
import Radio from "./Radio";
import TV_Table from "./Tv_table";
import Sofa from "./Sofa";
import TV from "./Tv";
import Vent from "./Vent";
import Shelf from "./Shelf";
import Project from "./Project";
import Desktop from "./Desktop"
import Police from "./Police"
import Paint from "./Paint"
import Cart from "./Cart"
import Skyrim from "./Skyrim"
import Fn from "./Fn"
import Mario from "./Mario"
import Keyboard from "./Keyboard.tsx"
import Mouse from "./Mouse.tsx"
import Backpack from "./Backpack.tsx";
import CD from "./CD.tsx"
import Links from "./Links.tsx"
import Credits from "./Credits.tsx"
import Floppy from "./Floppy.tsx"
import { useNavigate } from "react-router";


function Room(props: {
  handleHover: (value: boolean) => void;
  position: [number, number, number];
  openModal: (ref: THREE.Mesh, textDescription: string, tag: string | null) => void;
  closeModal: () => void;
  openPhoneModal:() => void;
  closePhoneModal: () => void;
  }) {
  const floorTexture = useLoader(THREE.TextureLoader, floorTextureAsset);
  const wallTexture = useLoader(THREE.TextureLoader, wallTextureAsset);
  const ceilTexture = useLoader(THREE.TextureLoader, ceilTextureAsset);
  let navigate = useNavigate();
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

  const [wallRef4] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [0, 5, 5.5], // front wall
    args: [10, 10, 1],
  }))

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


  const openCreditsPage = () => {
    navigate("/credits");
  }


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

           {/* Static Front Wall */}
        <mesh ref={wallRef4}>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="#FCFBF4" map={wallTexture} />
      </mesh> 


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



      <Links position={[-4.8,0,-1]} scale={1.5} rotation={[0,1.56,0]}/>
      
        {/* Monitor */}
        <Monitor
        position={[0.1, 1.3, -3.7]}
        rotation={[0, 3.1, 0]}
      />
      
      {/* projects on shelf */}
      <Project
        tag="top"
        textDescription="Although Basket buddy hasn't launched yet, I gained so much freelance and startup experience. 
I learned to negotiate rates as a freelance web developer, I got tons of experience when it came to developing for a start up, and I was really fortunate to be able to work on this project. I hope it gets to see the light of day.
"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.68]}
        >
          <Cart scale={0.05} position={[0,-0.13,0]}/>
          </Project>


      {/* projects on shelf */}
      <Credits
        tag="top"
        textDescription="All music credit go to Éloi"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[-4.3,-0.05,0]}
        >
          <CD scale={2} position={[0,-0.13,0]}/>
        </Credits>

        <Credits
        tag="top"
        textDescription="All music credit go to Éloi"
        handleHover={props.handleHover}
        openModal={() => openCreditsPage()}
        closeModal={props.closeModal}
        position={[-4.3,0.06,0.6]}
        >
          <Floppy  scale={2} position={[0,0,0]}/>
        </Credits>

      <Project
        tag="top"
        textDescription="An Arduino water irragtaion project that I had worked on during the summer of 2024 for my dad's greenhouse. I was able to create a self watering garden where we were able to harvest the fruits of our labour! Literally! I really enjoy manipulating microcontrollers as I get to use my coding skills but also interact with the real world, it's a nice change of pace when just focusing on the wiring, voltage, design of the breadboard etc...."
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0]}
      >
      <Circuit scale={0.15}/>
        </Project>

    <Project
        tag="top"
        textDescription="I really enjoyed the redesign process of my portfolio site, to this day I am still trying to figure out how to improve it. I learned that I enjoyed making low and high fidelity wireframes
next.js, Server Side Rendering, using headless SEO's . Although I did rush some parts of it, I truly am proud of the site, and I will continue to improve the design."
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, -1, 1.2]}
      > 
      <Paint scale={0.04}  rotation={[4, 0, 2]}/>
      </Project>

      <Project
        tag="middle"
        textDescription="I took a 2 year full stack web development course at Fanshawe college where I learned how to use front-end apps utilizing the react and angular framework, learned how to implement ui/ux concepts,  built mobile game apps using react-native and understanding physic concepts, learnt about agile and sprint methodologies. College was a turning point for me as I actually got to pursue something that I was passionate about, an experience that I lacked through high school to a degree. Sadly I didn't form any long term relationships with my peers due to the COVID-19 pandemic, but I was lucky enough to form stronger bonds with my peers from high school. I had amazing teachers who stocked my passion for learning and they always encourage us to keep pushing ourselves. "
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[-0, 0, 1.2]}
      > 
      <Fanshawe scale={0.05} position={[0,-0.45,0]} />
      </Project>


      <Project
        tag="middle"
        textDescription="AFTER 10 MONTHS OF UNEMPLOYMENT, I FINALLY GOT A WEB DEV JOB At the Ontario Police College. I got to work in a office environment for the first time, truly cubicle heaven. I get to work on old systems coming up with creative ways at solving problems and introducing new technologies to the workflow. I get to bring in new technologies and systems when tackling problems. The current stack we work with is Drupal, php, MySQL and python. I get the chance to tackle problems in any way I see fit, having this sense of freedom allows me to decide how to best solve problems and learn.
"
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0]}

      > 
      <Police scale={0.05} position={[0,-0.45,0]}/>
      </Project>


      <Project
        tag="middle"
        textDescription="My first tech job fully remote, every project was a challenge for me which helped me grow in so many ways. It was a pretty small organization but it felt like we were making huge impacts in our community and the whole of Canada. I learned how to fail at delivering tasks, I felt this was something I really took to heart as you can't always deliver and in a career and age where we are always trying to be better than our peers and ourselves this really helped me grow, knowing that it was alright to fail and to just brush the dirt off your shoulder and try again."
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.65]}

      > 
      <Plant_3 scale={0.05} position={[0,-0.45,0]}/>
      </Project>

      <Project
        tag="lower"
        textDescription="Skyrim was the first game that I truly loved. The world building and care that bethesda put into its game blew my tiny 12 year old mind. I never felt more immerssed and paired with the power of childhood imagination really left me with an unforgettable experience. To this day it's probably my most replayed game to date. "
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
        textDescription="I was introduced to Fallout New Vegas by my dad, I remember watching him play on our xbox 360, at that time when i saw it i didn't think anything too much of it, due to the brown colours. But as I grew older I decided to take a shot at the game, and I was in love with the depth of lore between factions and the amount of choices. Another aspect that the game contributed was a sense of community with my other friends who had played it, we would talk about what items were the best, the DLC's (thanks randy for allowing me to use your copy of the game), factions and their ideologies. As well being able to discuss the game with my dad brought us together as I was more of a indoorsman and him an outdoorsman, but being able to share our love really stuck with me to this day."
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
        textDescription="Ahhh , where to start with Mario Kart. My earliest memory of this game was playing the ballon battle while my dad was having a meeting. looking back on it now it gives me a warm fuzzy feeling of nostalgia which influenced the style of this site to a degree. "
        handleHover={props.handleHover}
        openModal={props.openModal}
        closeModal={props.closeModal}
        position={[0, 0, 0.68]}
        >
          <Mario scale={0.10} position={[0,-0.94,-0.04]} />
        </Project>


 
      <Phone openPhoneModal={props.openPhoneModal} closePhoneModal={props.closePhoneModal} position={[0, 0.4, 0]} scale={0.1}/>
     
      </>
  );
}

export default Room;
