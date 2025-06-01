import React, { useEffect, useMemo } from "react";
import { PointerLockControls, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

interface Modal {
  isOpen: boolean;
  currentObject: { ref: THREE.Mesh; textDescription: string , tag: string | null} | null;
  handleHover: (value: boolean) => void;
}

function DarkWindow({ isOpen, currentObject, handleHover }: Modal) {
const clonedObject = useMemo(() => {
  if (!currentObject) return null;

  const clone = currentObject.ref.clone();

  console.log(currentObject.tag)
  switch (currentObject.tag){
    case 'top':
      console.log('top')
      clone.position.set(0, 0, 0); // Reset position to center the object
      break;
    case 'middle':
      console.log('middle')
      clone.position.set(0,10,0);
      break;
    case 'lower':
      console.log('lower ')
      clone.position.set(0,28,0)
      break;
  }
  return clone;
}, [currentObject]);



  useEffect(() => {
    if (!currentObject) return;

    handleHover(false); // Disable hover while modal is open
    // console.log('inside dark modal')
    // console.log(currentObject.textDescription)
    const elem = document.getElementById("textDescription");
    if (elem) appearChars(currentObject.textDescription, elem, 20);

    // Cleanup function to clear text content when the modal is closed
    return () => {
      if (elem) elem.innerHTML = "";
    };
  }, [currentObject]);

  function appearChars(str: string, elem: HTMLElement, timeBetween: number) {
    let index = 0;
    function displayNextChar() {
      if (index < str.length) {
        elem.innerHTML += str.charAt(index);
        index++;
        setTimeout(displayNextChar, timeBetween);
      }
    }
    displayNextChar();
  }

  if (!isOpen || !currentObject) return null;

  return (
    <div style={overlayStyle}>
      <Canvas
        camera={{ position: [4, 13, -7] }}
        style={{ width: "100%", height: "80%" }}
      >
        <PointerLockControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={3}
          enableZoom={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        {/* Render cloned object */}
        {clonedObject ? (
          <>
            <primitive object={clonedObject}  scale={35} />
          </>
        ) : null}
      </Canvas>
      <div style={modalStyle}>
        <p id="textDescription"></p>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 10,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "rgba(14,13,13, 0.8)",
  color: "#fff",
  padding: "20px",
  width: "80%",
  textAlign: "center",
  fontFamily: "Geo, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
};

export default DarkWindow;
