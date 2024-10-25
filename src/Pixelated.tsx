import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PixelatedEffect: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const renderTarget = new THREE.WebGLRenderTarget(320, 240); // Lower resolution for pixelation

  // Create a ref for the screen quad
  const screenQuadRef = useRef<THREE.Mesh>(null);

  useFrame(({ gl, scene, camera }) => {
    // Set the render target
    gl.setRenderTarget(renderTarget);
    gl.clear();

    // Render the scene to the render target
    gl.render(scene, camera);

    // Reset the render target to default (screen)
    gl.setRenderTarget(null);

    if (screenQuadRef.current) {
      const texture = renderTarget.texture;
      const material = screenQuadRef.current.material;

      // Check if material is an array or a single material
      if (Array.isArray(material)) {
        material.forEach((mat: THREE.Material) => {
          (mat as THREE.MeshBasicMaterial).map = texture; // Use type assertion
          mat.needsUpdate = true;
        });
      } else {
        (material as THREE.MeshBasicMaterial).map = texture; // Use type assertion
        material.needsUpdate = true;
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      renderTarget.setSize(window.innerWidth / 2, window.innerHeight / 2); // Adjust size here
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderTarget]);

  return (
    <>
      {/* Render the actual scene */}

      {/* Fullscreen quad to display the pixelated texture */}
      <mesh ref={screenQuadRef} position={[0, 0, -1]}>
        <planeGeometry args={[2, 2]} />

        {children}
        <meshBasicMaterial map={renderTarget.texture} />
      </mesh>
    </>
  );
};

export default PixelatedEffect;
