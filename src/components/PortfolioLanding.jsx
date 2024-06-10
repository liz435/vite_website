import { ClickableSphere } from './ClickableSphere.jsx';
import {useState, useEffect, } from 'react';


export function PortfolioLanding() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 600);
      // console.log('isVisible')
      return () => clearTimeout(timer);

    }, []);
  
    const ModelData = [
      { position: [4, 1.5, 0],
        url: "https://example.com/page1",
       title:"example",
      path:'model_asset/belt_model.glb',
        key:'M1', scale:[0.01,0.01,0.01],
        rotation :[0,3,0],
        content: "somepath"
      },
      { position: [4, 0.7, 0],
        url: "https://example.com/page2",
        title:"example" ,
        path:'model_asset/nyc.glb',
        key:'M2', scale:[0.02,0.02,0.02],
        rotation :[0,5.0,0],
        content: "somepath2"
      },
      { position: [6, 1.5, 0],
        url: "https://example.com/page3",
        title:"example" ,
        path:'model_asset/button.glb',
        key:'M3', scale:[0.7,0.7,0.7],
        rotation :[1.4,1.4,0],
        content: "somepath3"
      },
    ];
  
    return (
      <group position={[0, 1, -5]}>
        { ModelData.map((sphere) =>(
          <ClickableSphere
            key={sphere.key}
            position={sphere.position}
            url={sphere.url}
            title={sphere.title}
            scale={sphere.scale}
            modelPath={sphere.path}
            rotation={sphere.rotation}
            shouldRotate={sphere.shouldRotate}
            content={sphere.content}
          />
        ))}
      </group>
    );
  }
  