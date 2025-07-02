import { createContext, useContext } from "react";
import { io } from 'socket.io-client';

// 1. create socket instance
const socket = io('http://localhost:3000');
//2. create context
const SocketContext = createContext();

// 3. create provider
export function SocketProvider({ children }) {
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

// 4.Custom hook to access socket
export function useSocket() {
    return useContext(SocketContext);
}