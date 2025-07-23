import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SocketProvider from "./context/socket.jsx";
import UserProvider from "./context/User.jsx";
import { SnackbarProvider } from "./context/Snackbar.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SocketProvider>
    <UserProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </UserProvider>
  </SocketProvider>
  // </StrictMode>,
);
