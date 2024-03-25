import {useState, useEffect, } from 'react';

export function NameRender(){
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
      <h1>
       ZELONG LI
      </h1>
     )}
      </>
    )
  }
  