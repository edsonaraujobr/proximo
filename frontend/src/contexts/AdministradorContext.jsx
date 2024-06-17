import{ createContext,  useState } from 'react';

export const AdministradorContext = createContext();

export function AdministradorProvider({ children }) {
  const [administrador, setAdministrador] = useState(null); // Estado para armazenar informações do usuário

  const login = (administradorData) => {
    setAdministrador(administradorData); // Define o usuário logado no estado
  };

  const logout = () => {
    setAdministrador(null); // Limpa as informações do usuário ao fazer logout
  };

  return (
    <AdministradorContext.Provider value={{ administrador, login, logout }}>
      {children}
    </AdministradorContext.Provider>
  );
}

