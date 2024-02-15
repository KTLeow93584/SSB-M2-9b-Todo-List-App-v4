import { Navigate } from 'react-router-dom';
import { GetAuthContext } from '../contexts/AuthContext';

export default function AuthCheck({ children }) {
    const authContext = GetAuthContext();

    if (!authContext)
        return <Navigate to="/login" replace />;

    const user = authContext.user;
    const token = authContext.token;

    // Debug
    //console.log("User: ", user + ", Token: " + token);

    if (!user || !token)
        return <Navigate to="/login" replace />;

    return children;
}