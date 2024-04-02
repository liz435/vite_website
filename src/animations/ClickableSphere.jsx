import { useSpring, animated } from '@react-spring/three';
import { useState, Suspense,useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

import { Text, OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three';
import * as THREE from 'three';

function LoadModel({position, modelPath, scale, rotation, callback}){
  console.log("Loading model at URL:", modelPath)
  const gltf = useLoader(GLTFLoader, modelPath);
  const mixerRef = useRef(); 
  const modelRef = useRef ();
  const clock = new THREE.Clock();

  
  useEffect(() => {
    mixerRef.current = new AnimationMixer(gltf.scene);
    
    gltf.animations.forEach((clip) => {
      const action = mixerRef.current.clipAction(clip);
      // action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();
    });
  }, [gltf.animations, gltf.scene]);


  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
    const time = clock.getElapsedTime();


    if(callback){
      modelRef.current.rotation.y+=0.01
    }

    if (modelRef.current) {
      // Oscillate up and down
      modelRef.current.position.y = position[1] + Math.sin(time) * 0.2;
      // Oscillate left and right
      modelRef.current.position.x = position[0] + Math.cos(time) * 0.1;
    }
     
  });

  return <primitive object={gltf.scene} ref={modelRef} scale={scale} rotation={rotation} position={position} />;


}


export function ClickableSphere({ position, url, title, scale, modelPath, rotation, callback}) {
  const [hovered, setHovered] = useState(false);
  console.log(modelPath)
  console.log("Scale:", scale);

  const { scaleAfter, color } = useSpring({
    scaleAfter: hovered ? [3, 3, 3] : [1, 1, 1],
    color: hovered ? 'navy' : 'skyblue',
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handleClick = () => {
    window.location.href = url;
  };

  const handleModelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };


  return (
    <>
    <animated.mesh
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scaleAfter={scaleAfter}
    >
      <Suspense fallback={null}>
          <LoadModel modelPath={modelPath} position={position} scale={scale} rotation={rotation} callback={callback} />

      {hovered && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
              </Suspense>
    </animated.mesh>

    </>

  );
}
