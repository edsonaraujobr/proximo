import { useState } from "react";
import { Login } from "./Login.jsx";
import { Historico } from "./Historico.jsx";
import { Atendimento } from "./Atendimento.jsx";

export function App() {
    const [changeToAdministrator, setChangeToAdministrator] = useState(true);

    const changeTypeUser = () => {
        setChangeToAdministrator(!changeToAdministrator);
    }

    return (
        // <div>
        //     { changeToAdministrator ? 
        //         (    
        //             <Login 
        //             typeUser = "Atendente"
        //             otherUser = "Administrador"
        //             onButtonChangeUser = {changeTypeUser}
        //             />) 
        //         : (
        //             <Login 
        //             typeUser = "Administrador"
        //             otherUser = "Atendente"
        //             onButtonChangeUser = {changeTypeUser}
        //             />
        //         )
        //     }
        // </div> 

        // <Historico/>
         <Atendimento/>
    )
}