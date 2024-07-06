import {Routes, Route} from "react-router-dom"
import { ScreenCoffee } from "./pages/Clerk/ScreenCoffee";
import { ScreenDinner } from "./pages/Clerk/ScreenDinner";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { HomeClerk } from "./pages/Clerk/HomeClerk";
import { HomeAdministrator } from "./pages/Administrator/HomeAdministrator";
import { ScreenLunch } from "./pages/Clerk/ScreenLunch";
import { SettingsClerk } from "./pages/Clerk/SettingsClerk";

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
                <ScreenLunch>
                    <Home/>
                </ScreenLunch>
            }
            />
            <Route path="/atendente/cafe" element=
            {
                <ScreenCoffee>
                    <Home/>
                </ScreenCoffee>
            }
            />
            <Route path="/atendente/jantar" element=
            {
                <ScreenDinner>
                    <Home/>
                </ScreenDinner>
            }
            />
            <Route path="/atendente/home" element=
            {
                <HomeClerk>
                    <Home/>
                </HomeClerk>
            }
            />
            <Route path="/configuracoes" element={<SettingsClerk/>} />
        </Routes>
    )
}

export default MainRoutes;