import{ createContext,  useState } from 'react';

export const ClerkContext = createContext();

export function ClerkProvider({ children }) {
  const [clerk, setClerk] = useState(null);

  const login = (clerkData) => {
    setClerk(clerkData); 
  };

  const logout = () => {
    setClerk(null); 
  };

  return (
    <ClerkContext.Provider value={{ clerk, login, logout }}>
      {children}
    </ClerkContext.Provider>
  );
}

