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
            <Route path="/administrator" element=
            {
                <Login
                    typeUser="administrator"
                    otherUser="clerk"
                />
            }
            />
            <Route path="/clerk" element=
            {
                <Login
                    typeUser="clerk"
                    otherUser="administrator"
                />
            }
            />
            <Route path="/administrator/home" element=
            {
                <ProtectedRoute typeUser="administrator" element={HomeAdministrator}/>
            }
            />
            <Route path="/clerk/lunch" element=
            {
                <ProtectedRoute typeUser="clerk" element={ScreenLunch}/>
            }
            />
            <Route path="/clerk/coffee" element=
            {
                <ProtectedRoute typeUser="clerk" element={ScreenCoffee}/>
            }
            />
            <Route path="/clerk/dinner" element=
            {
                <ProtectedRoute typeUser="clerk" element={ScreenDinner}/>
            }
            />
            <Route path="/clerk/home" element=
            {
                <ProtectedRoute typeUser="clerk" element={HomeClerk}/>
            }
            />
            <Route path="/clerk/settings" element=
            {
                <ProtectedRoute typeUser="clerk" element={SettingsClerk}/>
            } 
            />
            <Route path="/administrator/settings" element=
            {
                <ProtectedRoute typeUser="administrator" element={SettingsAdministrator}/>
            } 
            />
        </Routes>
    )
}

export default MainRoutes;