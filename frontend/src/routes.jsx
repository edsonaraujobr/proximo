import {Routes, Route} from "react-router-dom"
import { Almoco } from "./pages/Atendente/Almoco";
import { CafeManha } from "./pages/Atendente/CafeManha";
import { Jantar } from "./pages/Atendente/Jantar";
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
            <Route path="/atendente/almoco" element=
            {
                <Almoco>
                    <Home/>
                </Almoco>
            }
            />
            <Route path="/atendente/cafeManha" element=
            {
                <CafeManha>
                    <Home/>
                </CafeManha>
            }
            />
            <Route path="/atendente/jantar" element=
            {
                <Jantar>
                    <Home/>
                </Jantar>
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