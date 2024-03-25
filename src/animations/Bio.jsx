import {useState, useEffect, } from 'react';

export function Bio(){
    const [isVisible, setIsVisible] = useState(false);
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 600); 
    
        return () => clearTimeout(timer);
      }, []);
  
    return(
      <>
      {isVisible && (
        <div>
      <h1 className='bio-title'>
        Bio Placeholder
      </h1>
      <p className='bio-p'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit pellentesque habitant morbi. Commodo viverra maecenas accumsan lacus vel. Tellus pellentesque eu tincidunt tortor aliquam. Ornare lectus sit amet est placerat in egestas erat imperdiet. Tortor id aliquet lectus proin nibh nisl condimentum id. Suscipit adipiscing bibendum est ultricies integer. In cursus turpis massa tincidunt. Eu turpis egestas pretium aenean pharetra magna ac placerat. Purus in mollis nunc sed id semper. Enim blandit volutpat maecenas volutpat blandit aliquam. Gravida quis blandit turpis cursus in hac. Sit amet porttitor eget dolor morbi. Rhoncus dolor purus non enim.
     </p>
     <p className='bio-p'>
     Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Rhoncus aenean vel elit scelerisque mauris. Habitant morbi tristique senectus et netus et malesuada fames ac. Tellus molestie nunc non blandit massa enim nec dui nunc. Libero id faucibus nisl tincidunt eget nullam non nisi. Tincidunt tortor aliquam nulla facilisi. Ut faucibus pulvinar elementum integer enim. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Dis parturient montes nascetur ridiculus mus mauris vitae. Facilisis volutpat est velit egestas dui id ornare arcu odio.
     </p>
     </div>
     )}
      </>
    )
  }
  