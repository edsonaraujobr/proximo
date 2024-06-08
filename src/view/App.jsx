import { useState } from "react";
import { Login } from "./Login.jsx";
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
        <div className=" fixed ">
            { showHistorico ? 
                (
                    <Historico
                        onButtonExit={toggleHistorico}
                    /> 
                ) : (
                        <div>
                            { changeToAdministrator ? 
                                (    
                                    <Login 
                                    typeUser = "Atendente"
                                    otherUser = "Administrador"
                                    onButtonChangeUser = {changeTypeUser}
                                    onButtonLogin={toggleHistorico}
                                    />
                                ) 
                                : (
                                    <Login 
                                    typeUser = "Administrador"
                                    otherUser = "Atendente"
                                    onButtonChangeUser = {changeTypeUser}
                                    onButtonLogin={toggleHistorico}
                                    />
                                )
                            }
                        </div>
                    )
            };
        </div>

        // <Atendimento/>
    )
}