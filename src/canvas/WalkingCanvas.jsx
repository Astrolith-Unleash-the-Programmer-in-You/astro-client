/* eslint-disable react/no-unknown-property */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
// import { Walking } from "../components/Walking";

// const LINE_NB_POINTS = 1000;
// const CURVE_DISTANCE = 250;
// const CURVE_AHEAD_CAMERA = 0.008;
// const CURVE_AHEAD_AIRPLANE = 0.02;
// const AIRPLANE_MAX_ANGLE = 35;
// const FRICTION_DISTANCE = 42;

const WalkingCanvas = () => {
  // const lineMaterialRef = useRef();

  // const curvePoints = useMemo(
  //   () => [
  //     new THREE.Vector3(0, 0, 0),
  //     new THREE.Vector3(0, 0, -CURVE_DISTANCE),
  //     new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
  //     new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
  //     new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
  //     new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
  //     new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
  //     new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
  //   ],
  //   []
  // );

  // const curve = useMemo(() => {
  //   return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  // }, []);

  // const shape = useMemo(() => {
  //   const shape = new THREE.Shape();
  //   shape.moveTo(0, -0.08);
  //   shape.lineTo(0, 0.08);

  //   return shape;
  // }, [curve]);

  // const cameraGroup = useRef();
  // // const cameraRail = useRef();
  // // const camera = useRef();
  // // const scroll = useScroll();
  // const tl = useRef();

  // const lastScroll = useRef(0);

  // useFrame((_state, delta) => {
  //   const scrollOffset = Math.max(0, scroll.offset);
  //   let friction = 1;

  //   let lerpedScrollOffset = THREE.MathUtils.lerp(
  //     lastScroll.current,
  //     scrollOffset,
  //     delta * friction
  //   );
  //   lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
  //   lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

  //   lastScroll.current = lerpedScrollOffset;
  //   tl.current.seek(lerpedScrollOffset * tl.current.duration());

  //   const curPoint = curve.getPoint(lerpedScrollOffset);
  //   cameraGroup.current.position.lerp(curPoint, delta * 24);
  // });

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <directionalLight position={[1, 10, 1]} intensity={0.2} />
      <ambientLight intensity={0.5} />
      <pointLight intensity={1.5} />
      <hemisphereLight skyColor="#b1e1ff" groundColor="#66600" />
      <Suspense>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={6}
              // onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group> */}

        <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
          <Walking
          // rotation-y={Math.PI / 2}
          // scale={[0.2, 0.2, 0.2]}
          // position-y={0.1}
          />
        </Float>
        {/* <Walking /> */}
      </Suspense>
    </Canvas>
  );
};

export default WalkingCanvas;
// export default Computers
