import HomeFeed from "./HomeFeed";
import SignUP from "./Components/SignUp";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";
import NotFound from './Components/NotFound';
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function Twitter() {
  let [user, setUser] = useState(null);
  const checkAuth = () => {
    axios
      .get("/api/auth/status", {
        credentials: "include",
        withCredentials: true,
      })
      .then((res) => {
        console.log("Login : ", res.data.loggedIn);
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeFeed user={user} />} />
          <Route path="/signup" element={<SignUP />} />
          <Route
            path="/login"
            element={
              <Login checkAuth={checkAuth} handleSetUser={handleSetUser} />
            }
          />
          <Route
            path="/logout"
            element={<Logout handleSetUser={handleSetUser} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound user={user}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
