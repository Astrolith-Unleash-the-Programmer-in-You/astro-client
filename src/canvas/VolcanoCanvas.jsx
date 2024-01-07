/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { Volcano } from "../components/Volcano";
import * as THREE from "three";

const VolcanoCanvas = () => {
  // const lightRef = useRef();
  return (
    <Canvas
      // shadows
      // frameloop="demand"
      camera={{ near: 0.2, far: 10000, position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* <ambientLight intensity={0.5} />
      <rectAreaLight intensity={0.5} />
      <pointLight position={[0, 1, 0]} intensity={1.5} />
      <hemisphereLight groundColor={"ebe8e891"} intensity={0.5} />
      <lightProbe />
      <directionalLight
        ref={lightRef}
        position={[0, 2, 0]}
        intensity={0.5}
        castShadow={true}
      /> */}
      <ambientLight intensity={0.05} />
      <directionalLight position={[0, 1.3, 0.05]} intensity={1.5} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight position={[0, -20, 10]} intensity={10.5} />
      <spotLight
        position={[-20, -50, 10]}
        angle={0.92}
        prenumbre={1}
        intensity={12.3}
        castShadow
        // shadow-mapSize={1024}
      />

      <Suspense fallback={null}>
        {/* <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
        <Volcano />
      </Suspense>

      <meshStandardMaterial color="red" />
    </Canvas>
  );
};

export default VolcanoCanvas;
