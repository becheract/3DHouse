import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox, PlaneProps } from "@react-three/cannon";
import * as THREE from "three";
interface CustomPlaneProps extends PlaneProps {
  type?: "Static" | "Dynamic" | "Kinematic";
  children: ChildComponentProps;
}

function Plane(props: CustomPlaneProps) {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      {props.children}
    </mesh>
  );
}
