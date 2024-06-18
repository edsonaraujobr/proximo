import {Routes, Route} from "react-router-dom"
import { Almoco } from "./pages/Clerk/Almoco";
import { Cafe } from "./pages/Clerk/Cafe";
import { Jantar } from "./pages/Clerk/Jantar";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { HomeClerk } from "./pages/Clerk/HomeClerk";
import { HomeAdministrator } from "./pages/Administrator/HomeAdministrator";

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
                <HomeAdministrator>

                </HomeAdministrator>
            }
            />
            <Route path="/atendente/almoco" element=
            {
                <Almoco>
                    <Home/>
                </Almoco>
            }
            />
            <Route path="/atendente/cafe" element=
            {
                <Cafe>
                    <Home/>
                </Cafe>
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
                <HomeClerk>
                    <Home/>
                </HomeClerk>
            }
            />
        </Routes>
    )
}

export default MainRoutes;