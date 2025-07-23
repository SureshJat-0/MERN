import { io } from "socket.io-client";
import { createContext, useContext } from "react";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);
const SocketContext = createContext();

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
