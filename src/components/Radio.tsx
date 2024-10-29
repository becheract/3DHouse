import { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useThree, useLoader } from "@react-three/fiber";

interface SoundProps {
  url: string;
}

function isSafari() {
  return (
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor)
  );
}

function Sound({ url }: SoundProps) {
  const sound = useRef<THREE.PositionalAudio>(null!);
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  camera.add(listener);
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    const resumeAudioContext = () => {
      if (listener.context.state === "suspended") {
        listener.context.resume();
      }
    };

    if (isSafari()) {
      document.addEventListener("click", resumeAudioContext, { once: true });
    }

    if (sound.current) {
      sound.current.setBuffer(buffer);
      sound.current.setRefDistance(0.3);
      sound.current.setDirectionalCone(90, 180, 1);
      sound.current.setLoop(true);
      sound.current.play();
      camera.add(listener);
      return () => {
        if (isSafari()) {
          document.removeEventListener("click", resumeAudioContext);
        }
        camera.remove(listener);
      };
    }
  }, [buffer, camera, listener]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

export default function Model(props: JSX.IntrinsicElements["group"]) {
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
      > 
<Sound url="/Radio/mirage.mp3" />
      </mesh>
      
    </group>
  );
}

useGLTF.preload("/radio.glb");


