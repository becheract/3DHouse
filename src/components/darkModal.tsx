// Dark Window Component (Modal)
import React, { useState, useRef, useEffect } from "react";
import {
  useGLTF,
  CycleRaycast,
  Text,
  PointerLockControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  currentObject: { ref: THREE.Mesh; textDescription: string } | null;
  handleHover: (value: boolean) => void;
}

interface Paragraph {
  text: string;
}

function DarkWindow({ isOpen, onClose, currentObject, handleHover }: Modal) {
  if (!isOpen || !currentObject) return null; // Only render if open

  const clonedObject = currentObject.ref.clone();

  useEffect(() => {
    console.log("inside interaction");
    console.log(currentObject);
  }, [currentObject]);

  useEffect(() => {
    handleHover(false);

    if (document !== null) {
      // example
      var str = currentObject.textDescription;
      var elem = document.getElementById("textDescription")!;
      var timeBetween = 42;

      appearChars(str, elem, timeBetween);
    }
  }, []);

  function appearChars(str: string, elem: HTMLElement, timeBetween: number) {
    var index = -1;
    (function go() {
      if (++index < str.length) {
        elem.innerHTML = elem.innerHTML + str.charAt(index);
        setTimeout(go, timeBetween);
      }
    })();
  }

  return (
    <div style={styles.overlay}>
      {/* 3D Object Rendering */}
      <Canvas
        camera={{ position: [4, 13, -7] }}
        style={{
          width: "100%",
          height: "80%",
          border: "1px solid red",
        }} // Customize canvas size and style
      >
        <PointerLockControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          enableZoom={true}
          minPolarAngle={Math.PI / 2} // Lock the y-axis movement
          maxPolarAngle={Math.PI / 2} // Lock the y-axis movement
        />{" "}
        {/* Allow rotating the object */}
        {/* Render the current object */}
        <primitive object={clonedObject} position={[0, -2.5, 0]} scale={25} />
      </Canvas>
      <div style={styles.modal}>
        <p id="textDescription"></p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed" as const,

    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background
    display: "flex" as const,
    justifyContent: "center" as const,
    alignItems: "center " as const,
    flexDirection: "column" as const,
    zIndex: 10, // Ensure it's on top of everything
  },
  modal: {
    backgroundColor: "rgba(14,13, 13, 0.8)", // Dark background
    color: "#fff",
    padding: "20px",
    width: "80%",
    textAlign: "center" as const,
    fontFamily: "Geo, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  },
};

export default DarkWindow;
