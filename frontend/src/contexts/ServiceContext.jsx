import React, { createContext,  useState } from 'react';

export const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [service, setService] = useState(null);

  const openService = (service) => {
    setService(service); 
  };

  const closeService = () => {
    setService(null); 
  };

  return (
    <ServiceContext.Provider value={{ service, openService, closeService }}>
      {children}
    </ServiceContext.Provider>
  );
}

