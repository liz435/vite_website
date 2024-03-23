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
  left: new THREE.Euler(0, Math.PI / 14, 0),
  right: new THREE.Euler(0, -Math.PI / 8, 0),
  back: new THREE.Euler(Math.PI/10,0,0),
};

export default function App(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  const [targetRotation, setTargetRotation] = useState(rotations.front);
  const [currentRotation, setCurrentRotation] = useState(new THREE.Euler(0, 0, 0));
  const [currentDirection, setCurrentDirection] = useState(null);

  const handleDirectionChange = (direction) => {
    setCurrentDirection(direction);
  };

  


  // const handleButtonClick = (rotationKey) => {
  //   setTargetRotation(rotations[rotationKey]);
  // };  
  
  const handleButtonClick = (rotationKey) => {
    setTargetRotation(rotations[rotationKey]);
    setCurrentDirection(rotationKey);
  };


  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative", zIndex: "0" }}>
        <Canvas flat shadows onClick={click} dpr={window.devicePixelRatio*0.8} gl={{ antialias: false }} camera={{ position: [0, 1, 30], fov: 17.5, near: 10, far: 50 }} {...props}>
          <color attach="background" args={['#141622']} />
          {/* <OrbitControls /> */}
          <TextMesh />
   
          <Physics /*debug*/ timeStep="vary" gravity={[4.5, 1, 0]}>
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
          <CameraRotator targetRotation={targetRotation} setCurrentRotation={setCurrentRotation} />

        </Canvas>


        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
          <ul style={{listStyleType: "none"}}>
          <h1><p className="glow" style={{ marginLeft: '10px', marginBottom:'10px',marginTop: '20px' }}>Zelong Li</p></h1>
          </ul>
        </div>

    
        

        <div className='buttonList' style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
          <ul>
        <li><button onClick={() => handleButtonClick('back')}>Bio</button></li>
        <li><button onClick={() => handleButtonClick('right')}>Portfolio</button></li>
        <li><button onClick={() => handleButtonClick('left')}>Contact</button></li>
        <li><button onClick={() => handleButtonClick('front')}>Home</button></li>
        </ul>
        </div>
            
      </div>
      <div style={{ position: "absolute", zIndex: "1" }}>
      </div>
    </>
  );
}


function Sth(){
console.log("here")
return(
  <h1>
    fjoi2dn2o
  </h1>
)
}

function CameraRotator({ targetRotation }) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.01, delta); // Adjust this factor for smoothness

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, lerpFactor);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, lerpFactor);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.z, lerpFactor);
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