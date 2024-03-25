import { ClickableSphere } from './ClickableSphere.jsx';
import {useState, useEffect, } from 'react';


export function PortfolioLanding() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }, []);
  
    // Define positions for the spheres and their respective URLs
    const spheresData = [
      { position: [10, 3, 0], url: "https://example.com/page1", title:"example" },
      { position: [15, 3.1, 0], url: "https://example.com/page2", title:"example" },
      { position: [21, 3.2, 0], url: "https://example.com/page3", title:"example" },
      { position: [10, -2, 0], url: "https://example.com/page4", title:"example" },
      { position: [15, -2.1, 0], url: "https://example.com/page5" , title:"example"},
      { position: [21, -2.2, 0], url: "https://example.com/page6" , title:"example"},
    ];
  
    return (
      <group position={[0, 1, -5]}>
        {isVisible && spheresData.map((sphere, index) => (
          <ClickableSphere
            key={index}
            position={sphere.position}
            url={sphere.url}
            title={sphere.title}
          />
        ))}
      </group>
    );
  }
  