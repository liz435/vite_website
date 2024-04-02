import React, { Suspense,useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three';
import * as THREE from 'three';

function Model({ modelUrl, position, scale, callback}) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const mixerRef = useRef(); 
  const modelRef = useRef ()

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

    if(callback){
      modelRef.current.rotation.y+=0.01
    }
  });

  return <primitive object={gltf.scene} ref={modelRef}scale={scale} position={position} />;
}

export default function FiberglassLoadModel({path, position, scale, callback}) {
 
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
          <Model modelUrl={path} position={position} scale={scale} callback={callback} />
        </Suspense>


    </>
  );
}