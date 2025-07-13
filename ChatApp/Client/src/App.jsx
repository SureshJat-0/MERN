import { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import { useSocket } from "./context/socket";
import axios, { all } from "axios";
import { useUser } from "./context/User";

function App() {
  const socket = useSocket();
  const [groups, setGroups] = useState(["General", "Random"]);
  const [serverMsgs, setServerMsgs] = useState([]);
  const {users, setUsers, currentUser, setCurrentUser} = useUser();

  const handleGetServerMsgs = (serverMsgsData) => {
    setServerMsgs(serverMsgsData);
  };

  useEffect(() => {
    socket.on("getServerMsgs", handleGetServerMsgs);
    return () => {
      socket.off("getServerMsgs", handleGetServerMsgs);
    };
  }, [socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chat"
          element={
            <ChatPage serverMsgs={serverMsgs} groups={groups} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
