import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const SkySphere: React.FC<{ textureUrl: string }> = ({ textureUrl }) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  return (
    <mesh>
      <sphereGeometry args={[450, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default SkySphere;
