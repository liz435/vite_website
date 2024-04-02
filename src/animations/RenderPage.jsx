import React, { useState, useEffect } from 'react';
import { useSphere } from './SphereContex'; // Ensure correct spelling and path
import '../template.css'

const RenderPage = ({ currentDirection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [closed, setClosed] =useState(true)
  const { selectedSphereInfo, clicked } = useSphere(); // Assuming onSphereClick isn't used here

  useEffect(() => {
    
    // Set visibility to true after 600ms only if currentDirection is "right"
    if (currentDirection === "right") {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
    // Reset visibility if currentDirection changes and is not "right"
    else {
      setIsVisible(false);
    }
  }, [currentDirection]);

  // Render the selected sphere info only if isVisible is true
  return (
    <>
      {isVisible && clicked&&closed&& (
        <>
        <div className='container'>
        <div className='container2'>
        <div className='first-col'>
            <div className='title'>
                {selectedSphereInfo.title}
            </div>
        <div className='viewport'>
        </div>
        </div>
        </div>

     

     

        <div className='intro'>
        Tools: {selectedSphereInfo.tool}
        </div>

        <div>
            
        </div>
        </div>
        <div className='grid'>
 
        <img className='image' src='src/assets/SoundWave/4.png'/>
        </div>
        <button onClick={()=>{ setClosed(false)}}>
            BACK
        </button>
        </>
      )}
    </>
  );
};

export default RenderPage;
