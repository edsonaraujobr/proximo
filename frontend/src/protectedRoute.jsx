import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, typeUser }) {
    const token = localStorage.getItem(`${typeUser}_authToken`);
    const expiration = localStorage.getItem(`${typeUser}_tokenExpiration`);

    const isTokenValid = () => {
        if (!token || !expiration) {
            return false;
        }

        const now = new Date().getTime();
        return now < expiration;
    }

    return isTokenValid() ? <Component /> : <Navigate to={`/${typeUser}`} />;
}

export default ProtectedRoute;
