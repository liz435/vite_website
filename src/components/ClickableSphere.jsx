import { useSpring, animated } from '@react-spring/three';
import { useState, Suspense,useEffect, useRef, useContext } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { selectSphere } from '../actions';
import { SphereContext } from '../SphereProvider';

import { AnimationMixer } from 'three';
import * as THREE from 'three';

function LoadModel({position, modelPath, scale, rotation, shouldRotate, callback}){
  // console.log("Loading model at URL:", modelPath)
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

    if(shouldRotate){
      modelRef.current.rotation.y+=0.01
      modelRef.current.position.y = position[1] + Math.sin(time) * 0.2;
      modelRef.current.position.x = position[0] + Math.cos(time) * 0.1;
    }
  
  });

  return <primitive object={gltf.scene} ref={modelRef} scale={scale} rotation={rotation} position={position} />;


}


export function ClickableSphere({ position, url, title, scale, modelPath, rotation, content, callback}) {
  const [hovered, setHovered] = useState(false);
  const { selectSphere } = useContext(SphereContext);


  const { scaleAfter, color,p } = useSpring({
    // scaleAfter: hovered ? [3, 3, 3] : [1, 1, 1],
    // color: hovered ? 'navy' : 'skyblue',
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handleClick = () => {
    // window.location.href = url;

    selectSphere({ url, title, scale, modelPath, rotation, content, callback });
    // console.log(selectSphere)
  };


    const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };



  return (
    <>
    <animated.mesh
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Suspense fallback={null}>
          <LoadModel modelPath={modelPath} position={position} scale={scale} rotation={rotation}  shouldRotate={!hovered} callback={callback} />
              </Suspense>
    </animated.mesh>

    </>

  );
}
