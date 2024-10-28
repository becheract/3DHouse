const CubeLoader = () => {
  return (
    <mesh rotation={[1, 2, 0]}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

export default CubeLoader;
