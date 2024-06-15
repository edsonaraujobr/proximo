import { useState } from "react";
import { LoginAdministrador } from "./LoginAdministrador.jsx";
import { Historico } from "./Historico.jsx";
import { Atendimento } from "./Atendimento.jsx";

export function App() {
    const [changeToAdministrator, setChangeToAdministrator] = useState(true);
    const [showHistorico, setShowHistorico] = useState(false);

    const changeTypeUser = () => {
        setChangeToAdministrator(!changeToAdministrator);
    }

    const toggleHistorico = () => {
        setShowHistorico(!showHistorico);
    };

    return (
        <LoginAdministrador 
            typeUser = "Administrador"
            otherUser = "Atendente"
            onButtonChangeUser = {changeTypeUser}
        />


        // <Atendimento/>
    )
}