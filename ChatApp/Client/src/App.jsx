import CircularProgress from "@mui/material/CircularProgress";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import ProtactedRoute from "./Components/Auth/ProtactedRoute";
import axios from "axios";
import { useUser } from "./context/User";
import { useEffect, useState } from "react";

function App() {
  const { setCurrentUser, setUsers } = useUser();
  const [loading, setLoading] = useState(true);

  async function getAuth() {
    try {
      const authRes = await axios.get("/api/auth/status", {
        withCredentials: true,
      });
      setCurrentUser(authRes.data.user); // setting current user
      const usersRes = await axios.get("/api/user/users");
      setUsers(usersRes.data); // setting all users
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAuth();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtactedRoute>
              <ChatPage />
            </ProtactedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
