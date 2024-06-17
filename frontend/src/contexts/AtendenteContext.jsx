import{ createContext,  useState } from 'react';

export const AtendenteContext = createContext();

export function AtendenteProvider({ children }) {
  const [atendente, setAtendente] = useState(null); // Estado para armazenar informações do usuário

  const login = (atendenteData) => {
    setAtendente(atendenteData); // Define o usuário logado no estado
  };

  const logout = () => {
    setAtendente(null); // Limpa as informações do usuário ao fazer logout
  };

  return (
    <AtendenteContext.Provider value={{ atendente, login, logout }}>
      {children}
    </AtendenteContext.Provider>
  );
}

