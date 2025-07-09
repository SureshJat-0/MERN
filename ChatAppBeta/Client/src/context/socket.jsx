import { io } from "socket.io-client";
import { createContext, useContext } from "react";

const socket = io("http://localhost:3000");
const SocketContext = createContext();

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
