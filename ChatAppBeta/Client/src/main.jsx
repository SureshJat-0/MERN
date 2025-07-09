import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SocketProvider from "./context/socket.jsx";
import UserProvider from "./context/User.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SocketProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </SocketProvider>
  // </StrictMode>,
);
