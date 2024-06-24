import React, { createContext,  useState } from 'react';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(null);

  const login = (clerkData) => {
    setStudent(clerkData); 
  };

  const logout = () => {
    setStudent(null); 
  };

  return (
    <StudentContext.Provider value={{ student, login, logout }}>
      {children}
    </StudentContext.Provider>
  );
}

