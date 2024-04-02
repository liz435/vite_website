import React, { Suspense,useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three';
import * as THREE from 'three';

function Model({ modelUrl, position, scale, rotation, callback}) {
  const gltf = useLoader(GLTFLoader, modelUrl);
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

export default function LoadLandingModel({path, position, scale, rotation, callback}) {
 
  const handleModelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  return (
    <>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <Model modelUrl={path} position={position} scale={scale} rotation={rotation} callback={callback} />
        </Suspense>


    </>
  );
}