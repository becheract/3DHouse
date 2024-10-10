import React, { useState, useEffect } from "react";
import { useGLTF, CycleRaycast, Text } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import {
  useBox,
  usePlane,
  PlaneProps,
  BoxProps,
  useSphere,
} from "@react-three/cannon";

interface projects {
  text: string;
  handleHover: (value: boolean) => void;
}

export default function Project(props: projects) {
  const [hover, setHover] = useState(false);
  const [arduinoRef] = useSphere<THREE.Mesh>(() => ({
    type: "Dynamic",
    position: [4.2, 2.2, 0.1],
  }));

  const { camera } = useThree();
  const distanceThreshold = 3;
  const distanceChecker = () => {
    if (arduinoRef.current) {
      if (hover == false) {
        if (
          camera.position.z <=
          arduinoRef.current.position.z + distanceThreshold
        ) {
          console.log("can interact with");
          props.handleHover(true);
          setHover(true);
        } else {
          props.handleHover(false);
          setHover(false);
        }
      } else if (hover == true) {
        props.handleHover(false);
        setHover(false);
      }
    }
  };

  useFrame(() => {
    if (arduinoRef.current)
      if (
        camera.position.z >
        arduinoRef.current.position.z + distanceThreshold
      ) {
        props.handleHover(false);
        setHover(false);
      } else if (
        hover == true &&
        camera.position.z > arduinoRef.current.position.z + distanceThreshold
      ) {
        props.handleHover(false);
        setHover(false);
      }
  });

  return (
    <mesh
      ref={arduinoRef}
      onPointerOver={(e) => {
        console.log("hovering over object");
        distanceChecker();
      }}
      onPointerLeave={(e) => {
        console.log("no longer hovering");
        distanceChecker();
      }}
    >
      {/* {hover ? (
        <Text
          anchorX={"center"}
          fontSize={0.3}
          rotation={[0, -1, 0]}
          anchorY={"middle"}
        >
          Interact with {props.text}
        </Text>
      ) : null} */}
      <sphereGeometry args={[0.2, 5, 5]} />
      <meshStandardMaterial flatShading color={"red"} />
    </mesh>
  );
}
