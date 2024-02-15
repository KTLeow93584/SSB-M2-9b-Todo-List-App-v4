import { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

const UserDBContext = createContext(null);
export function GetUserDBContext() {
    return useContext(UserDBContext);
}

export function UserDBContextComponent({ children }) {
    const [users, setUsers] = useLocalStorage("userDB", [
        {
            id: 1,
            firstName: "admin",
            lastName: "admin",
            email: "admin@admin.com",
            password: "111111",
            activeToken: null
        },
        {
            id: 2,
            firstName: "user",
            lastName: "user",
            email: "user@user.com",
            password: "123456",
            activeToken: null
        }
    ]);

    return (
        <UserDBContext.Provider value={{ users: users, setUsers: setUsers }}>
            {children}
        </UserDBContext.Provider>
    );
}