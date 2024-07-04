import React, { createContext,  useState } from 'react';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(null);

  const save = (clerkData) => {
    setStudent(clerkData); 
  };

  const remove = () => {
    setStudent(null); 
  };

  return (
    <StudentContext.Provider value={{ student, save, remove }}>
      {children}
    </StudentContext.Provider>
  );
}

