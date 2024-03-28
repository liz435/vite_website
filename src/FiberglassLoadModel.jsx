import React, { Suspense,useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three';
import * as THREE from 'three';

function Model({ modelUrl }) {
  const gltf = useLoader(GLTFLoader, modelUrl);
  const mixerRef = useRef(); // Use a ref to persist the AnimationMixer instance

  useEffect(() => {
    mixerRef.current = new AnimationMixer(gltf.scene);
    
    gltf.animations.forEach((clip) => {

      const action = mixerRef.current.clipAction(clip);
      // action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();
    });
  }, [gltf.animations, gltf.scene]);

  // Update the mixer on each frame
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, 0, 0]} />;
}

export default function FiberglassLoadModel() {
  const [modelUrl, setModelUrl] = useState('model_asset/belt_animated.glb'); // Update this path to your GLTF model

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
          <Model modelUrl={modelUrl} />
        </Suspense>


    </>
  );
}
