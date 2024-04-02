import * as THREE from 'three'
import React ,{ useRef, useState, useEffect, useReducer, useMemo } from 'react';
import { Canvas,  useFrame, useThree } from '@react-three/fiber';
import { Stats, OrbitControls, Text, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { easing } from 'maath';
import { Bio} from './animations/Bio.jsx'
import { PortfolioLanding } from './animations/PortfolioLanding.jsx';
import { CameraRotator } from './animations/CameraRotator.jsx';
import {NameRender} from './animations/NameRender.jsx'
import LoadLandingModel from './LoadLandingModel.jsx';
import './index.css';


const accents = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff'];
const shuffle = (accent = 0) => [
];

const rotations = {
  front: new THREE.Euler(0, 0, 0),
  left: new THREE.Euler(-Math.PI/30, Math.PI / 14, Math.PI/30),
  right: new THREE.Euler(0.01, -Math.PI / 8, 0),
  top: new THREE.Euler(Math.PI/15,0,0),
};

export default function App(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  const [targetRotation, setTargetRotation] = useState(rotations.front);
  const [currentRotation, setCurrentRotation] = useState(new THREE.Euler(0, 0, 0));
  const [currentDirection, setCurrentDirection] = useState('front');


  const isDevMode = import.meta.env.DEV
  
  const handleButtonClick = (rotationKey) => {
    setTargetRotation(rotations[rotationKey]);
    setCurrentDirection(rotationKey);
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative", zIndex: "0" }}>
        <Canvas flat shadows onClick={click} dpr={window.devicePixelRatio*0.8} gl={{ antialias: false }} camera={{ position: [0, 1, 30], fov: 17.5, near: 10, far: 50 }} {...props}>
          <color attach="background" args={['#141610']} />
          {/* <OrbitControls/> */}
          {/* <TextMesh /> */}
          {currentDirection === 'left' && <CanvasRenderedText />}

          <Physics /*debug*/ timeStep="vary" gravity={[0, 0, 0]}>


            {/* <LoadLandingModel path={'model_asset/belt_model.glb'} scale={[0.02,0.02,0.02]} rotation ={[0,5.0,0]} position={[15,2,2]}/>  */}
            <LoadLandingModel path={'model_asset/nyc.glb'} position={[0.5,3,0]} scale={[0.1,0.1,0.1]} callback={'yes'}/>
            {connectors.map((props, i) => (
              <Sphere key={i} {...props} />
            ))}
          </Physics>

          <Environment resolution={256}>
  
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[-10, 1, 0]} scale={8} />
              <Lightformer form="ring" color="#fffafa" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
            </group>
          </Environment>
          {currentDirection === 'right' && <PortfolioLanding />}
          {isDevMode && <Stats showPanel={0} className="stats" {...props} />}
          <CameraRotator targetRotation={targetRotation} setCurrentRotation={setCurrentRotation} />

        </Canvas>



          <div className="title" style={{top:20}}>
          {currentDirection === 'front' && <NameRender />}
            </div>

  

        <div  className="bio-container"  style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
          {currentDirection === 'top' && <Bio />}
        </div>
            
          <div className='btn-container'>
        <div className='buttonList' style={{ position: 'absolute', top: 30, left: 20, zIndex: 3,  }}>
        <button onClick={() => handleButtonClick('top')}>BIO</button>
        <button onClick={() => handleButtonClick('right')}>PORTFOLIO</button>
        <button onClick={() => handleButtonClick('left')}>CONTACT</button>
        <button onClick={() => handleButtonClick('front')}>HOME</button>
        </div>
        </div>
                
      </div>
      <div style={{ position: "absolute", zIndex: "1" }}>
      </div>
    </>
  );
}



function CanvasRenderedText(){
return(
<>
<group position={[-7, 0.5, 5]}>
<Text
  color="white"
  anchorX="center"
  anchorY="middle"
  fontSize={1}
  maxWidth={200}
  children="Say Something"
/>
</group>

<group position={[-6, -2.5, 5]}>
<Text
  color="white"
  anchorX="center"
  anchorY="middle"
  fontSize={1}
  maxWidth={100}
  children="longzeely@gmail.com"
/>
</group>

{/* <group position={[-6, -3, 5]}>
<Text
  color="white"
  anchorX="center"
  anchorY="middle"
  fontSize={1}
  maxWidth={100}
  children="instagram@longzeely"
/>
</group> */}
</>
)
}

function TextMesh() {
  return (
    <group position={[-2, 1, 3]}> 
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      fontSize={1}
      maxWidth={200}
      children="Zelong Li"
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