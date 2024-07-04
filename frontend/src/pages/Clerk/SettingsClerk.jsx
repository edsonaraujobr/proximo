import { Cross1Icon, CameraIcon, LockClosedIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../componentes/Button.jsx";
import { Header } from "../../componentes/Header.jsx";
import { useContext } from "react";
import { ClerkContext } from "../../contexts/ClerkContext.jsx";
import { useNavigate } from "react-router-dom";

export function SettingsClerk({ children }) {
  const { clerk } = useContext(ClerkContext);
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/home");
  };

  return (
    <Dialog.Root>
      <div className="flex flex-col bg-slate-800 w-lvw h-lvh text-white gap-4">
        <Header
          name={clerk.name}
          linkPhoto={clerk.photo}
          onClickedSettings={handleClickBack}
        />

        <div className="flex flex-col px-10">
          <h2 className="text-2xl mb-4">Configurações do Atendente</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Alterar Foto</h3>
              <div className="flex items-center gap-2">
                <CameraIcon className="w-6 h-6" />
                <input type="file" accept="image/*" className="text-white" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Alterar Senha</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    placeholder="Senha Atual"
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    placeholder="Nova Senha"
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6" />
                  <input
                    type="password"
                    placeholder="Confirme a Nova Senha"
                    className="bg-slate-900 rounded-md p-2 text-white w-full"
                  />
                </div>
              </div>
            </div>

            <Button
              color="bg-green-700"
              text="Salvar Alterações"
              hover="bg-green-900"
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </Dialog.Root>
  );
}
