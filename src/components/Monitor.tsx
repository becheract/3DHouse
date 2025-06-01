import { useEffect, useRef } from "react";
import { useGLTF} from "@react-three/drei";
import * as THREE from "three";
import { Triplet, useBox } from "@react-three/cannon";
import Video from "./skyrim.mp4"
interface Computer {
  // handleHover: (value: boolean) => void;
  // openModal: (ref: THREE.Mesh, text: string) => void;
  // closeModal: () => void;
  position: Triplet | undefined;
  rotation: Triplet | undefined;
}

export default function Model(props: Computer) {
  const { nodes, materials } = useGLTF("Monitor/monitor.glb");

  const videoRef = useRef<THREE.Mesh>(null!);
  // Set up a render target for the cube's render texture
  // const emissorRef = useRef<THREE.Mesh>(null!);

    const meshRef = useRef<THREE.Mesh>(null!);

    const [bodyRef] = useBox<THREE.Group>(() => ({
      type: "Dynamic",
      position: props.position,
      rotation: props.rotation
    }));

    useEffect(()=>{
      const videoElement = document.createElement("video");
      videoElement.src = Video; // Replace with your video path or URL
      videoElement.crossOrigin = "anonymous";
      videoElement.loop = true; // Set to true if you want the video to loop
      videoElement.muted = true; // Optional: to mute the video
      videoElement.play(); // Autoplay the video
      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.flipY = false; // Flip the video texture along the Y-axis
      videoTexture.minFilter = THREE.NearestFilter;
      videoTexture.magFilter = THREE.NearestFilter;
      videoTexture.needsUpdate = true;

          if (videoRef.current) {
            const material = videoRef.current.material;
      
            // Handle case where material is an array or a single material
            if (Array.isArray(material)) {
              material.forEach((mat: THREE.Material) => {
                if (mat instanceof THREE.MeshBasicMaterial) {
                  mat.map = videoTexture;
                  mat.needsUpdate = true;
                }
              });
            } else {
              if (material instanceof THREE.MeshBasicMaterial) {
                material.map = videoTexture;
                material.needsUpdate = true;
              }
            }
          }
    })
  return (
   
<group dispose={null} ref={bodyRef}>
     <group  scale={0.375} dispose={null} >
        <mesh
        ref={meshRef}
          geometry={(nodes.TV_04_1 as THREE.Mesh).geometry}
          material={materials.Electronics}
          position={[0,1.8,0]}
        />
        <mesh
        ref={videoRef}
         geometry={(nodes.TV_04_2 as THREE.Mesh).geometry}
          position={[0,1.8,0]}
          scale={[1,1, 1]}
        >
        </mesh>
      </group>
      </group>
  );
}



useGLTF.preload("/monitor.glb");
