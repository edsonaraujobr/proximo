import {Routes, Route} from "react-router-dom"
import { ScreenCoffee } from "./pages/Clerk/ScreenCoffee";
import { ScreenDinner } from "./pages/Clerk/ScreenDinner";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { HomeClerk } from "./pages/Clerk/HomeClerk";
import { HomeAdministrator } from "./pages/Administrator/HomeAdministrator";
import { ScreenLunch } from "./pages/Clerk/ScreenLunch";
import { SettingsClerk } from "./pages/Clerk/SettingsClerk";
import { SettingsAdministrator } from "./pages/Administrator/SettingsAdministrator";
import ProtectedRoute from "./protectedRoute.jsx";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element=
            {
                <Home/>
            } 
            />
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
                <ProtectedRoute typeUser="administrador" element={HomeAdministrator}/>
            }
            />
            <Route path="/atendente/almoco" element=
            {
                <ProtectedRoute typeUser="atendente" element={ScreenLunch}/>
            }
            />
            <Route path="/atendente/cafe" element=
            {
                <ProtectedRoute typeUser="atendente" element={ScreenCoffee}/>
            }
            />
            <Route path="/atendente/jantar" element=
            {
                <ProtectedRoute typeUser="atendente" element={ScreenDinner}/>
            }
            />
            <Route path="/atendente/home" element=
            {
                <ProtectedRoute typeUser="atendente" element={HomeClerk}/>
            }
            />
            <Route path="/atendente/configuracoes" element=
            {
                <ProtectedRoute typeUser="atendente" element={SettingsClerk}/>
            } 
            />
            <Route path="/administrador/configuracoes" element=
            {
                <ProtectedRoute typeUser="administrador" element={SettingsAdministrator}/>
            } 
            />
        </Routes>
    )
}

export default MainRoutes;