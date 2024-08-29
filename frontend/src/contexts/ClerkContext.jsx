import { createContext, useState, useEffect } from 'react';

export const ClerkContext = createContext();

export function ClerkProvider({ children }) {

  const [clerk, setClerk] = useState(() => {
    const storedClerk = localStorage.getItem('clerk');
    return storedClerk ? JSON.parse(storedClerk) : null;
  });

  useEffect(() => {
    if (clerk) {
      const clerkObject = {
        id: clerk.id,
        name: clerk.name,
        photo: clerk.photo
      }
      localStorage.setItem('clerk', JSON.stringify(clerkObject));
    } else {
      localStorage.removeItem('clerk');
    }
  }, [clerk]);

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
