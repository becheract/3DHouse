import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useBox, usePlane, PlaneProps, BoxProps } from "@react-three/cannon";
import floorTextureAsset from "../assets/floor.png";
import wallTextureAsset from "../assets/wally.webp";
import Bed from "../components/Bed";
import Fan from "../components/Fan";
import Bookcase from "../components/Bookcase";
import Dresser from "../components/Dresser";
import Table from "../components/Table";
import Chair from "../components/Chair";
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";

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
      {/* Dresser */}
      <Dresser position={[20, 0, 0]} rotation={[0, 0, 0]} />
      {/*Table */}
      <Table
        position={[-0, 0, -3.9]}
        rotation={[0, 4.7, 0]}
        scale={[1.8, 1.8, 1.8]}
      />
      <Chair position={[15, 0.5, -5]} rotation={[0, 0, 0]} />
    </>
  );
}

export default Room;
