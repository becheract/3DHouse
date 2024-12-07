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
import { useGLTF, MeshWobbleMaterial, CycleRaycast } from "@react-three/drei";

import floorTextureAsset from "../assets/floor.png";
import wallTextureAsset from "../assets/wally.webp";
import ceilTextureAsset from "../assets/ceil2.png";

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

import Painting_1 from "../components/Painting_1";
import Painting_2 from "../components/Painting_2";
import Painting_3 from "../components/Painting_3";
import Painting_4 from "../components/Painting_4";
import Painting_5 from "../components/Painting_5";

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

import Project from "./Project";

import CustomShaderMaterial from "../../shaders/CustomShaderMaterial";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";

function Room(props: {
  handleHover: (value: boolean) => void;
  position: [number, number, number];
  openModal: (ref: THREE.Mesh, textDescription: string) => void;
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
    position: [0, -4, 0], // Centered floor
  }));

  // Static walls using useBox
  const [wallRef1] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [-5, 5, 0], // Left wall
    args: [1, 10, 10], // Thin vertical wall
  }));

  const [wallRef2] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [15, 5, 0], // Right wall
    args: [1, 10, 10],
  }));

  const [wallRef3] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [10, 5, -5], // Back wall
    args: [10, 10, 1],
  }));

  const [ceilingRef] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [0, 5, 0], // Ceiling
    args: [20, 1, 20], // Thin horizontal ceiling
  }));

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          map: { value: floorTexture }, // Your floor texture
          uvScale: { value: 105 }, // Adjust the scale value to zoom in or out
        },
        vertexShader: vertexShader, // Your vertex shader code
        fragmentShader: fragmentShader, // Your fragment shader code
      }),
    [floorTexture]
  );

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

      {/* Static Ceiling */}
      <mesh ref={ceilingRef}>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

    </>
  );
}

export default Room;
