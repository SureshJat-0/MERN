import HomeFeed from "./HomeFeed";
import SignUP from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Twitter() {
  let [user, setUser] = useState(null);
  const checkAuth = () => {
    axios
      .get("/api/auth/status", {
        credentials: "include",
        withCredentials: true,
      })
      .then((res) => {
        console.log('Login : ', res.data.loggedIn);
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
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/signup" element={<SignUP />} />
        <Route
          path="/login"
          element={
            <Login checkAuth={checkAuth} handleSetUser={handleSetUser} />
          }
        />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </>
  );
}
