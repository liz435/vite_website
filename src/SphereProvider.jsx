import React, { createContext, useState } from 'react';

export const SphereContext = createContext({
  currentSphere: null,
  selectSphere: () => {} 
});

export const SphereProvider = ({ children }) => {
  const [currentSphere, setCurrentSphere] = useState(null);

  const selectSphere = (sphereData) => {
    setCurrentSphere(sphereData);
  };

  return (
    <SphereContext.Provider value={{ currentSphere, selectSphere }}>
      {children}
    </SphereContext.Provider>
  );
};
