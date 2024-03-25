import * as THREE from 'three'
import { useThree, useFrame } from "@react-three/fiber";

export function CameraRotator({ targetRotation }) {
    const { camera } = useThree();
  
    useFrame((state, delta) => {
      const lerpFactor = 1 - Math.pow(0.01, delta); 
  
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, lerpFactor);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, lerpFactor);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.z, lerpFactor);
    });
  
    return null;
  }