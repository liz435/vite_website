import * as THREE from 'three'
import React ,{ useRef, useState, useEffect, useReducer, useMemo } from 'react';
import { Canvas,  useFrame, useThree } from '@react-three/fiber';
import { Stats, OrbitControls, Text, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { easing } from 'maath';
import { Effects } from './Effects.jsx';
import { useSpring, animated } from '@react-spring/three';
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
  left: new THREE.Euler(-Math.PI/30, Math.PI / 14, Math.PI/30),
  right: new THREE.Euler(0, -Math.PI / 8, 0),
  top: new THREE.Euler(Math.PI/10,0,0),
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
          {currentDirection === 'left' && <CanvasRenderedText />}
          <Physics /*debug*/ timeStep="vary" gravity={[6, 1, 0]}>
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
          {currentDirection === 'right' && <PortfolioLanding />}
          <Effects />
          <Stats showPanel={0} className="stats" {...props} />
          <CameraRotator targetRotation={targetRotation} setCurrentRotation={setCurrentRotation} />

        </Canvas>


        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
          <ul style={{listStyleType: "none"}}>
          <h1><p className="glow" style={{ marginLeft: '10px', marginBottom:'10px',marginTop: '20px' }}>Zelong Li</p></h1>
          </ul>
          
        </div>

        <div  className="bio-container"  style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
          {currentDirection === 'top' && <Bio />}
        </div>



        <div className='buttonList' style={{ position: 'absolute', top: 20, left: 20, zIndex: 3,  }}>
        <ul>
        <li><button onClick={() => handleButtonClick('top')}>Bio</button></li>
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

function Bio(){
  const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 600); 
  
      return () => clearTimeout(timer);
    }, []);

  return(
    <>
    {isVisible && (
      <div>
    <h1 className='bio-title'>
      Bio Placeholder
    </h1>
    <p className='bio-p'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi. Commodo viverra maecenas accumsan lacus vel. Tellus pellentesque eu tincidunt tortor aliquam. Ornare lectus sit amet est placerat in egestas erat imperdiet. Tortor id aliquet lectus proin nibh nisl condimentum id. Suscipit adipiscing bibendum est ultricies integer. In cursus turpis massa tincidunt. Eu turpis egestas pretium aenean pharetra magna ac placerat. Purus in mollis nunc sed id semper. Enim blandit volutpat maecenas volutpat blandit aliquam. Gravida quis blandit turpis cursus in hac. Sit amet porttitor eget dolor morbi. Rhoncus dolor purus non enim.
   </p>
   <p className='bio-p'>
   Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Rhoncus aenean vel elit scelerisque mauris. Habitant morbi tristique senectus et netus et malesuada fames ac. Tellus molestie nunc non blandit massa enim nec dui nunc. Libero id faucibus nisl tincidunt eget nullam non nisi. Tincidunt tortor aliquam nulla facilisi. Ut faucibus pulvinar elementum integer enim. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Dis parturient montes nascetur ridiculus mus mauris vitae. Facilisis volutpat est velit egestas dui id ornare arcu odio.
   </p>
   </div>
   )}
    </>
  )
}


function ClickableSphere({ position, url }) {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    config: { mass: 1, tension: 170, friction: 26 },
  });


  const handleClick = () => {
    window.location.href = url; 
  };

  return (
    <animated.mesh
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale} // Apply animated scale
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="skyblue" />
    </animated.mesh>
  );
}






function PortfolioLanding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Define positions for the spheres and their respective URLs
  const spheresData = [
    { position: [10, 3, 0], url: "https://example.com/page1" },
    { position: [15, 3.1, 0], url: "https://example.com/page2" },
    { position: [21, 3.2, 0], url: "https://example.com/page3" },
    { position: [10, -2, 0], url: "https://example.com/page4" },
    { position: [15, -2.1, 0], url: "https://example.com/page5" },
    { position: [21, -2.2, 0], url: "https://example.com/page6" },
  ];

  return (
    <group position={[0, 1, -5]}>
      {isVisible && spheresData.map((sphere, index) => (
        <ClickableSphere
          key={index}
          position={sphere.position}
          url={sphere.url}
        />
      ))}
    </group>
  );
}




function CanvasRenderedText(){
return(
<>
<group position={[-7, 1, 5]}>
<Text
  color="white"
  anchorX="center"
  anchorY="middle"
  fontSize={1}
  maxWidth={200}
  children="Say"
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

function CameraRotator({ targetRotation }) {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.01, delta); 

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
      children="Something      Hidden "
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