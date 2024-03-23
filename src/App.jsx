import * as THREE from 'three'
import { useRef, useState, useEffect, useReducer, useMemo } from 'react';
import { Canvas,  useFrame, useThree } from '@react-three/fiber';
import { Stats, OrbitControls, Text, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { easing } from 'maath';
import { Effects } from './Effects.jsx';
import './index.css';


const accents = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff'];
const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: '#444', roughness: 0.1, metalness: 0.5 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.3 },
  { color: '#444', roughness: 0.3 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.2 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true, transparent: true, opacity: 0.5 },
  { color: accents[accent], roughness: 0.3, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true }
];

const rotations = {
  front: new THREE.Euler(0, 0, 0),
  left: new THREE.Euler(0, Math.PI / 11, 0),
  right: new THREE.Euler(0, -Math.PI / 8, 0),
  back: new THREE.Euler(Math.PI/10,0,0),
};

export default function App(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  const [targetRotation, setTargetRotation] = useState(rotations.front);

  const handleButtonClick = (rotationKey) => {
    setTargetRotation(rotations[rotationKey]);
  };


  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative", zIndex: "0" }}>
        <Canvas flat shadows onClick={click} dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 50 }} {...props}>
          <color attach="background" args={['#141622']} />
          {/* <OrbitControls /> */}
          <TextMesh />
          <Physics /*debug*/ timeStep="vary" gravity={[7, 2, 0]}>
            <Pointer />
            {connectors.map((props, i) => (
              <Sphere key={i} {...props} />
            ))}
          </Physics>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
              <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
            </group>
          </Environment>
          <Effects />
          <Stats showPanel={0} className="stats" {...props} />
          <CameraRotator targetRotation={targetRotation} enabled={true} />

        </Canvas>

        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10,  }}>
          <ul style={{listStyleType: "none"}}>
          <h1><p className="glow" style={{ marginLeft: '10px', marginBottom:'10px',marginTop: '20px' }}>Zelong Li</p></h1>
          </ul>
        </div>
 

        <div className='buttonList' style={{ position: 'absolute', top: 20, left: 20, zIndex: 10,  }}>
          <ul>
        <li><button onClick={() => handleButtonClick('back')}>Introduction</button></li>
        <li><button onClick={() => handleButtonClick('left')}>Portfolio</button></li>
        <li><button onClick={() => handleButtonClick('right')}>Right</button></li>
        <li><button onClick={() => handleButtonClick('front')}>Home</button></li>
        </ul>
        </div>

      </div>
      <div style={{ position: "absolute", zIndex: "1" }}>
      </div>
    </>
  );
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 2);
}


function CameraRotator({ targetRotation, rotationRequestID }) {
  const { camera } = useThree();
  const [currentRequestID, setCurrentRequestID] = useState(null);
  const duration = 120000; // Example duration
  
  useFrame((state) => {
    if (rotationRequestID !== currentRequestID) {
      const currentTime = state.clock.getElapsedTime() * 1000; 
      const elapsedTime = currentTime % duration; // Reset every duration
      const progress = elapsedTime / duration;
      const easedProgress = easeOutCubic(progress);

      const interpolatedY = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, easedProgress);
      const interpolatedX = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, easedProgress);
      camera.rotation.y = interpolatedY;
      camera.rotation.x = interpolatedX;
      camera.updateProjectionMatrix();

      if (progress >= 1) {
        setCurrentRequestID(rotationRequestID); // Update to acknowledge the handled request
      }
    }
  });

  return null;
}





function TextMesh() {
  return (
    <group position={[0, 1, 5]}> 
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      fontSize={1}
      maxWidth={200}
      children="Something      Hidden"
    />
     </group>
  );
}

function Sphere({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, color = 'white', ...props }) {
  const api = useRef()
  const ref = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    easing.dampC(ref.current.material.color, color, 0.2, delta)
  })
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial {...props} />
        {children}
      </mesh>
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)))
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  );
}