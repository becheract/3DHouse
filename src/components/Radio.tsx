import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { GroupProps } from "@react-three/fiber"; // Import GroupProps from react-three/fiber

interface SoundProps {
  index: number;
}

interface ModelProps extends GroupProps {
  handleHover?: (value: boolean) => void; // Add your custom hover prop
}

interface EloiBeats {
  name: string;
  url:string;
}



function isSafari() {
  return (
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor)
  );
}

function Sound() {
  const sound = useRef<THREE.PositionalAudio>(null!);
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const indexRef = useRef(0);
  const radio = useRef<EloiBeats[]>([
    { name: "mirage", url: "/Radio/mirage.mp3" },
    { name: "luvr roq", url: "/Radio/luvr_roq_2k252.mp3" },
    { name: "ok ok ok", url: "/Radio/ok_ok_ok.mp3" },
    { name: "adidas girl", url: "/Radio/adidas_girl_2k25update.mp3" },
  ]).current;


  const audioLoader = useRef(new THREE.AudioLoader()).current;

  const loadAndPlay = useCallback((idx: number) => {
    const clampedIndex = (idx + radio.length) % radio.length;
    indexRef.current = clampedIndex;

    audioLoader.load(radio[clampedIndex].url, (buffer) => {
      if (sound.current) {
        sound.current.stop();
        sound.current.setBuffer(buffer);
        sound.current.setRefDistance(0.3);
        sound.current.setDirectionalCone(90, 180, 1);
        sound.current.setLoop(true);
        sound.current.play();
      }
    });
  }, [radio]);

  const resumeAudioContext = () => {
    if (listener.context.state === "suspended") {
      listener.context.resume();
    }
  };

  useEffect(() => {
    camera.add(listener);
    if (isSafari()) {
      document.addEventListener("click", resumeAudioContext, { once: true });
    }

    // Initial load
    loadAndPlay(indexRef.current);

    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") {
        console.log("q pressed");
        loadAndPlay(indexRef.current - 1);
      } else if (e.key === "e" || e.key === "E") {
        console.log("e pressed");
        loadAndPlay(indexRef.current + 1);
      }
      
    };

    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
      if (isSafari()) {
        document.removeEventListener("click", resumeAudioContext);
      }
      camera.remove(listener);
    };
  }, [camera, listener, loadAndPlay]);

  return <positionalAudio ref={sound} args={[listener]} />;
}


export default function Model({ handleHover: propHover, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("Radio/radio.glb");
  
  useEffect(() => {
    Object.values(materials).forEach((material: THREE.Material) => {
      if (
        material instanceof THREE.MeshBasicMaterial ||
        material instanceof THREE.MeshStandardMaterial
      ) {
        if (material.map) {
          material.map.minFilter = THREE.NearestFilter;
          material.map.magFilter = THREE.NearestFilter;
          material.map.needsUpdate = true;
        }
      }
    });
  }, [materials]);




  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={(nodes.Radio_01 as THREE.Mesh).geometry}
        material={materials.Electronics}
        position={[13.024, 0.234, 7.873]}
        rotation={[0, 1.571, 0]}
        scale={-0.163}
        onPointerOver={() => {
          if(propHover !== undefined)
          propHover(true)
        }}
        onPointerLeave={() => {
          if(propHover !== undefined)
          propHover(false)
        }}
      > 

      <Sound/>

      </mesh>
      
    </group>
  );
}

useGLTF.preload("/radio.glb");


