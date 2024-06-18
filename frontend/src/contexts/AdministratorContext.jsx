import{ createContext,  useState } from 'react';

export const AdministratorContext = createContext();

export function AdministratorProvider({ children }) {
  const [administrator, setAdministrator] = useState(null); 

  const login = (administratorData) => {
    setAdministrator(administratorData); 
  };

  const logout = () => {
    setAdministrator(null); 
  };

  return (
    <AdministratorContext.Provider value={{ administrator, login, logout }}>
      {children}
    </AdministratorContext.Provider>
  );
}

