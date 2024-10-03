import { useFrame } from "@react-three/fiber";

function JitteredCamera() {
  useFrame((state) => {
    const { x, y, z } = state.camera.position;
    state.camera.position.set(
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
      Math.round(z * 10) / 10
    );
    state.camera.updateProjectionMatrix();
  });

  return null;
}

export default JitteredCamera;
