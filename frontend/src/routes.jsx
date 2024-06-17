import {Routes, Route} from "react-router-dom"
import { Atendimento } from "./pages/Atendente/Atendimento";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { HomeAtendente } from "./pages/Atendente/HomeAtendente";
import { HomeAdministrador } from "./pages/Administrador/HomeAdministrador";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/administrador" element=
            {
                <Login
                    typeUser="administrador"
                    otherUser="atendente"
                />
            }
            />
            <Route path="/atendente" element=
            {
                <Login
                    typeUser="atendente"
                    otherUser="administrador"
                />
            }
            />
            <Route path="/administrador/home" element=
            {
                <HomeAdministrador>

                </HomeAdministrador>
            }
            />
            <Route path="/atendente/atendimento" element=
            {
                <Atendimento>
                    <Home/>
                </Atendimento>
            }
            />
            <Route path="/atendente/home" element=
            {
                <HomeAtendente>
                    <Home/>
                </HomeAtendente>
            }
            />
        </Routes>
    )
}

export default MainRoutes;