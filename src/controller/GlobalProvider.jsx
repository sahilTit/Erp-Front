import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formLink, setFormLink] = useState('');
  // console.log(formLink);
  return (
    <GlobalContext.Provider value={{ formLink, setFormLink }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
