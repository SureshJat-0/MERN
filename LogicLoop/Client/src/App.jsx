import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import History from "./Components/History/History";
import Quiz from "./Components/Quiz/Quiz";
import Memory from "./Components/Memory/Memory";
import Signup from "./Components/User/Signup";
import Login from "./Components/User/Login";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

function App() {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  // Function to check authentication status
  const getAuthStatus = async () => {
    try {
      const res = await axios.get("/api/auth/status", {
        withCredentials: true,
      });
      // console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  // Sending result data to backend for history
  const sendHistory = async (name, score) => {
    try {
      await axios.post(
        "/api/history",
        { name, score: String(score), user },
        { withCredentials: true }
      );
      console.log("History sent successfully");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'url("https://plus.unsplash.com/premium_photo-1681433426886-3d6d17f79d53?q=80&w=3229&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-white">Loading...</h1>
          </div>
        ) : (
          <>
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/history" element={<History user={user} />} />
              <Route
                path="/explore/quiz"
                element={<Quiz user={user} sendHistory={sendHistory} />}
              />
              <Route
                path="/explore/memory"
                element={<Memory user={user} n={9} sendHistory={sendHistory} />}
              />
              <Route
                path="/signup"
                element={<Signup getAuthStatus={getAuthStatus} />}
              />
              <Route
                path="/login"
                element={<Login getAuthStatus={getAuthStatus} />}
              />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
