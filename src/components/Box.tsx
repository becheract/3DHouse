import { useBox } from "@react-three/cannon";
import * as THREE from "three";

interface Box {
  position: [x: number, y: number, z: number];
  mass: number;
}

// Box with physics
function PhysicsBox(props: any) {
  // Create a physics-enabled box
  const [ref] = useBox<THREE.Mesh>(() => ({
    mass: 1,
    position: [0, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
      {props.children}
    </mesh>
  );
}

export default PhysicsBox;
