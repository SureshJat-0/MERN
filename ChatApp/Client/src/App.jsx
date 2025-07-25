import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./context/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtactedRoute from "./Components/Auth/ProtactedRoute";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ChatPage from "./Pages/ChatPage";
import Page404 from "./Components/Page404";

function App() {
  const { setCurrentUser, setUsers } = useUser();
  const [loading, setLoading] = useState(true);

  async function getAuth() {
    try {
      const authRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/status`,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(authRes.data.user); // setting current user
      if (authRes.data.user) {
        // get users only if authenticated
        const usersRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/users`,
          { withCredentials: true }
        );
        setUsers(usersRes.data); // setting all users
      }
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
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
