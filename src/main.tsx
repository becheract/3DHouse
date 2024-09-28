import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Box from "./components/Box";
import "./main.css";

function App() {
  return (
    <Canvas>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2]} />

      {/* Controls */}
      <OrbitControls />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Box Component */}
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
