import { ClickableSphere } from './ClickableSphere.jsx';
import {useState, useEffect, } from 'react';


export function PortfolioLanding() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 600);
      console.log('isVisible')
      return () => clearTimeout(timer);

    }, []);
  
    // Define positions for the spheres and their respective URLs
    const ModelData = [
      { position: [4, 1.5, 0], url: "https://example.com/page1", title:"example", path:'model_asset/belt_model.glb', key:'M1', scale:[0.01,0.01,0.01],rotation :[0,3,0], callback:'yes' },
      { position: [4, 0.7, 0], url: "https://example.com/page2", title:"example" , path:'model_asset/nyc.glb', key:'M2', scale:[0.02,0.02,0.02],rotation :[0,5.0,0]},
      // { position: [21, 3.2, 0], url: "https://example.com/page3", title:"example", path:'model_asset/belt_model.glb', key:'M3', scale:[0.1,0.1,0.1],rotation :[0,5.0,0] },
      // { position: [10, -2, 0], url: "https://example.com/page4", title:"example", path:'model_asset/belt_model.glb', key:'M4', scale:[0.1,0.1,0.1],rotation :[0,5.0,0] },
      // { position: [15, -2.1, 0], url: "https://example.com/page5" , title:"example", path:'model_asset/belt_model.glb', key:'M5', scale:[0.1,0.1,0.1],rotation :[0,5.0,0]},
      // { position: [21, -2.2, 0], url: "https://example.com/page6" , title:"example", path:'model_asset/belt_model.glb', key:'M6', scale:[0.1,0.1,0.1],rotation :[0,5.0,0]},
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
            callback={sphere.callback}
          />
        ))}
      </group>
    );
  }
  