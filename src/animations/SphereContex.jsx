import React, { createContext, useContext, useState } from 'react';

const SphereContex = createContext(); // Ensure spelling consistency

export const useSphere = () => useContext(SphereContex);

export const SphereProvider = ({ children }) => {
  const [selectedSphereInfo, setSelectedSphereInfo] = useState('');
  const [clicked, setClicked] = useState(false); // Corrected this line

  const onSphereClick = (info) => {
    setSelectedSphereInfo(info);
    setClicked(true);
  };

  return (
    <SphereContex.Provider value={{ selectedSphereInfo, clicked, onSphereClick }}>
      {children}
    </SphereContex.Provider>
  );
};
