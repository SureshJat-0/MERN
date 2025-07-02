import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [nicknameInput, setNicknameInput] = useState("");
    const [mySocketId, setMySocketId] = useState('');

    return(
        <UserContext.Provider value={{nicknameInput, mySocketId, setNicknameInput, setMySocketId}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return(useContext(UserContext));
}