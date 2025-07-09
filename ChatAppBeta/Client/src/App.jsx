import { useEffect, useState } from "react";
import Login from "./Components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import { useSocket } from "./context/socket";

function App() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [serverMsgs, setServerMsgs] = useState([]);

  useEffect(() => {
    socket.on("newUserJoin", (usersData) => {
      setUsers(usersData);
    });
    // geting messages from the server
    socket.on("getServerMsgs", (serverMsgsData) => {
      setServerMsgs(serverMsgsData);
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ChatPage
              users={users}
              serverMsgs={serverMsgs}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
