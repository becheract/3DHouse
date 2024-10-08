import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useBox, usePlane, PlaneProps, BoxProps } from "@react-three/cannon";
import { useGLTF, MeshWobbleMaterial } from "@react-three/drei";

import floorTextureAsset from "../assets/floor.png";
import wallTextureAsset from "../assets/wally.webp";

import Bed from "../components/Bed";
import Fan from "../components/Fan";
import Bookcase from "../components/Bookcase";
import Magazines from "./Magazines";
import Plant from "./Plant_1";
import Plant_2 from "../components/Plant_2";
import Plant_3 from "../components/Plant_3";
import Plant_4 from "../components/Plant_4";
import Plant_5 from "../components/Plant_5";

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

import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";
import CustomShaderMaterial from "../../shaders/CustomShaderMaterial";

function Room(props: THREE.Mesh) {
  const floorTexture = useLoader(THREE.TextureLoader, floorTextureAsset);
  const wallTexture = useLoader(THREE.TextureLoader, wallTextureAsset);

  // Configure texture wrapping and repeating
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10); // Set texture repeat for a tiled floor
  floorTexture.magFilter = THREE.NearestFilter;
  floorTexture.minFilter = THREE.NearestFilter;
  floorTexture.generateMipmaps = false;

  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10, 10); // Set texture repeat for a tiled floor
  wallTexture.magFilter = THREE.NearestFilter;
  wallTexture.minFilter = THREE.NearestFilter;
  wallTexture.generateMipmaps = false;

  useEffect(() => {
    // Set filtering for magnification (when zooming in)
    wallTexture.magFilter = NearestFilter;

    // Set filtering for minification (when zooming out)
    wallTexture.minFilter = LinearMipMapLinearFilter;

    // Enable mipmaps for better minification
    wallTexture.generateMipmaps = true;
    wallTexture.needsUpdate = true;
  }, [wallTextureAsset]);

  // Apply texture filtering on load
  useEffect(() => {
    // Set filtering for magnification (when zooming in)
    floorTexture.magFilter = NearestFilter;

    // Set filtering for minification (when zooming out)
    floorTexture.minFilter = LinearMipMapLinearFilter;

    // Enable mipmaps for better minification
    floorTexture.generateMipmaps = true;
    floorTexture.needsUpdate = true;
  }, [floorTextureAsset]);

  // Static floor using usePlane
  const [floorRef] = usePlane<THREE.Mesh>(() => ({
    type: "Static",
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
    position: [0, 5, -5], // Back wall
    args: [10, 10, 1],
  }));

  const [ceilingRef] = useBox<THREE.Mesh>(() => ({
    type: "Static",
    position: [0, 5, 0], // Ceiling
    args: [10, 1, 10], // Thin horizontal ceiling
  }));

  return (
    <>
      {/* Static Floor */}
      <mesh ref={floorRef} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial flatShading map={floorTexture} />
      </mesh>

      {/* Static Left Wall */}
      <mesh ref={wallRef1} receiveShadow>
        <boxGeometry args={[1, 10, 10]} />
        <meshStandardMaterial flatShading color="#FCFBF4" map={wallTexture} />
      </mesh>

      {/* Static Right Wall */}
      <mesh ref={wallRef2} receiveShadow>
        <boxGeometry args={[1, 10, 10]} />
        <meshStandardMaterial flatShading color="#FCFBF4" map={wallTexture} />
      </mesh>

      {/* Static Back Wall */}
      <mesh ref={wallRef3} receiveShadow>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial flatShading color="#FCFBF4" map={wallTexture} />
      </mesh>

      {/* Static Ceiling */}
      <mesh ref={ceilingRef} receiveShadow>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial flatShading color="red" map={wallTexture} />
      </mesh>
      {/* Fan */}
      <Fan position={[3, 3.5, -16]} rotation={[0, 1.6, 0]} />
      {/* Bed */}
      <Bed position={[6, 0, 5]} rotation={[0, -1.56, 0]} />
      {/* Bookcase */}
      <Bookcase
        position={[21.5, 0, -7]}
        rotation={[0, 0, 0]}
        scale={[1.6, 1.6, 1]}
      />
      {/* Plant */}
      <Plant position={[15, 0.2, -5]} />

      <Plant_2 position={[8, 0.2, -7]} />
      <Plant_3 position={[8, 0.2, -7]} />
      <Plant_4 position={[8, 0.2, -7]} />
      <Plant_5 position={[8, 0.2, -7]} />

      {/* Painting */}
      <Painting_1 position={[15, 0.2, -5]} rotation={[0, 0, 0]} />
      <Painting_2 position={[15, 0.2, -5]} rotation={[0, 0, 0]} />
      <Painting_3 position={[15, 0.2, -5]} rotation={[0, 0, 0]} />
      <Painting_4 position={[15, 0.2, -5]} rotation={[0, 0, 0]} />
      <Painting_5 position={[-7, 1.5, 4.56]} rotation={[0, 3.13, 0]} />

      {/* Chair */}
      <Chair position={[18, 2.4, 2]} />
      {/* Monitor */}
      <Monitor position={[10.7, 1.5, 2.2]} rotation={[0, 3.2, 0]} />
      {/* Cup */}
      <Cup position={[6, 1.5, -10]} />
      {/* Table */}
      <Table position={[13, 2, -16.7]} />
      {/* Bike */}
      <Bike position={[3.8, 0, -4]} scale={0.5} rotation={[0, 0, -0.2]} />
      {/* Magazines */}
      <Magazines position={[-14, 0, -4]} />
      {/* Garabage */}
      <Garbage position={[19, 1.6, -21.5]} scale={0.7} />
      {/* Radio */}
      <Radio position={[-12, 0, -6]} />
    </>
  );
}

export default Room;
