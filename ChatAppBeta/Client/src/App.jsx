import { useEffect, useState } from "react";
import Login from "./Components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import { useSocket } from "./context/socket";

function App() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState(["General", "Random"]);
  const [serverMsgs, setServerMsgs] = useState([]);

  const handleNewUserJoin = (usersData) => {
    setUsers(usersData);
  };
  const handleGetServerMsgs = (serverMsgsData) => {
    setServerMsgs(serverMsgsData);
  };
  useEffect(() => {
    socket.on("newUserJoin", handleNewUserJoin);
    socket.on("getServerMsgs", handleGetServerMsgs);
    return () => {
      socket.off("newUserJoin", handleNewUserJoin);
      socket.off("getServerMsgs", handleGetServerMsgs);
    };
  }, [socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ChatPage users={users} serverMsgs={serverMsgs} groups={groups} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
