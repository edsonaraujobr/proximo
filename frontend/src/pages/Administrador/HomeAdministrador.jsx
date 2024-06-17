import { AdministradorContext } from '../../contexts/AdministradorContext.jsx'; 
import { useContext } from "react"

export function HomeAdministrador () {
    const { administrador } = useContext(AdministradorContext);
    
    return (
        <div>
            <h1>
                Hello, {administrador.user.nome}.

            </h1>
        </div>
    )
}