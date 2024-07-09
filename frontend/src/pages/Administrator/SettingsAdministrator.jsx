import { useState } from "react";
import { Cross1Icon, CameraIcon, LockClosedIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../componentes/Button.jsx";
import { Header } from "../../componentes/Header.jsx";
import { useContext } from "react";
import { AdministratorContext } from "../../contexts/AdministratorContext.jsx";
import { useNavigate } from "react-router-dom";

export function SettingsAdministrator({ children }) {
  const { administrator } = useContext(AdministratorContext);
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("../administrador/home");
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordsDifferent, setPasswordDifferent] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);
  const handleCurrentPassword = (e) => setCurrentPassword(e.target.value);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      setPasswordUpdate(false);
      setPasswordInvalid(false);
      setPasswordDifferent(true);
      return;
    }

    const id=administrator.id;
    try {
      const response = await fetch(`http://localhost:3030/update-password-id/administrador`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password: newPassword, current:currentPassword}),
      });

      if (response.ok) {
        setNewPassword('');
        setConfirmNewPassword('');
        setCurrentPassword('');
        setPasswordUpdate(true);
        setPasswordInvalid(false);
        setPasswordDifferent(false);
      } else {
        setPasswordUpdate(false);
        setPasswordDifferent(false);
        setPasswordInvalid(true);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <Dialog.Root>
      <div className="flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4">
        <Header
          name={administrator.name}
          onClickedSettings={handleClickBack}
        />

        <div className="flex flex-col px-10">
          <h2 className="text-2xl mb-4">Configurações do Administrador</h2>

          <div className="flex flex-col gap-4">
      

            <form onSubmit={handleUpdatePassword}>
              <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Alterar Senha</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    placeholder="Senha Atual" 
                    required
                    onClick={()=>setPasswordUpdate(false)}
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Digite sua nova senha" 
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                    onClick={()=>setPasswordUpdate(false)}
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    placeholder="Confirme sua nova senha" 
                    required
                    onClick={()=>setPasswordUpdate(false)}
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
              </div>
            </div>
            {passwordInvalid && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300 mt-3">
              Senha incorreta - tente novamente
            </span>
            )}
            {passwordsDifferent && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300 mt-3">
              As senhas não coincidem - tente novamente
            </span>
            )}
            {passwordUpdate && (
            <span className="flex w-full justify-center items-center font-light text-sm text-yellow-300 mt-3">
              Senha atualizada com sucesso
            </span>
            )}
            <button type="submit" className="w-full mt-4 bg-green-700 text-white rounded-md h-7 hover:bg-green-900">Salvar Alterações</button>
            </form>
            <button type="" className="w-full  bg-green-700 text-white rounded-md h-7 hover:bg-green-900" onClick={handleClickBack}>Voltar</button>
            
            
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
}
