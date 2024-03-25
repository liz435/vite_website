import { useSpring, animated } from '@react-spring/three';
import { useState } from 'react';
import { Text } from '@react-three/drei';


export function ClickableSphere({ position, url, title }) {
  const [hovered, setHovered] = useState(false);

  const { scale, color } = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    color: hovered ? 'navy' : 'skyblue',
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handleClick = () => {
    window.location.href = url;
  };


  return (
    <>
    <animated.mesh
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <animated.meshStandardMaterial color={color} />
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
    </animated.mesh>

    </>

  );
}
