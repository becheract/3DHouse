import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Euler, useFrame, Vector3, useThree } from "@react-three/fiber";
import { vertexShader } from "../../shaders/vertexShader";
import { fragmentShader } from "../../shaders/fragmentShader";
import { distance } from "three/webgpu";

const distanceChecker = (
  hover: boolean,
  setHover: Dispatch<SetStateAction<boolean>>,
  handleHover: (value: boolean) => void,
  meshRef: React.RefObject<THREE.Mesh>,
  bodyRef: React.RefObject<THREE.Group>,
  camera: THREE.Camera
) => {
  const distanceThreshold = 3;

  if (bodyRef.current) {
    const distanceToBody = camera.position.distanceTo(bodyRef.current.position);
    const isWithinThreshold = distanceToBody <= distanceThreshold;

    return isWithinThreshold;
  }
};

export default distanceChecker;
