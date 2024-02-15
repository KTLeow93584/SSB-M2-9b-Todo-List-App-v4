import { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

const AuthContext = createContext(null);
export function GetAuthContext() {
    return useContext(AuthContext);
}

export function AuthContextComponent({ children }) {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser, token: token, setToken: setToken }}>
            {children}
        </AuthContext.Provider>
    );
}