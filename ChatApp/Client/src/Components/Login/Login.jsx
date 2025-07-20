import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/User";
import axios, { all } from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";

export default function Login() {
  const { users, setUsers, currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // login
      await axios.post(
        "/api/auth/login",
        { username: loginInput, password: passwordInput },
        { withCredentials: true }
      );
      // setting login user
      const loginUserRes = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      setCurrentUser(loginUserRes.data.user);
      // setting users
      const allUsersRes = await axios.get("/api/user/users", {
        withCredentials: true,
      });
      setUsers(allUsersRes.data);
      // UI update
      setLoginInput("");
      setPasswordInput("");
      navigate("/chat");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Login Error!";
      console.log(errMsg);
      setLoginInput("");
      setPasswordInput("");
      return alert(errMsg);
    }
  };
  return (
    <div className="flex overflow-hidden">
      <Navbar />
      <div className="flex w-screen h-screen">
        <div className="w-[48vw] h-screen flex justify-center">
          <Box
            onSubmit={handleLoginSubmit}
            className="mt-8 w-[50%] felx flex-col"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <TextField
              id="outlined-basic"
              label="Username"
              type="text"
              variant="outlined"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button
              type="submit"
              className="border py-2 cursor-pointer w-full rounded-lg bg-black text-white font-bold text-lg"
            >
              Login
            </button>
            <p>
              Don't have an account? <Link to="/signup"> Signup </Link>
            </p>
          </Box>
        </div>
        <div
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/b7/33/c4/b733c4edae153243ea5534f1b916b7ba.jpg')",
          }}
          className={`w-[48vw] h-full bg-cover bg-center rounded-tl-4xl rounded-bl-4xl`}
        >
          <div className="flex flex-col justify-center items-right text-2xl w-full h-full px-16 tracking-wider">
            <h1 className="text-4xl font-bold text-white my-4 mb-4">
              <span className="mb-1">Login your</span>
              <br />
              <span>account</span>
            </h1>
            <p className="text-2xl text-gray-200 font-semibold">
              <span>Ready to chat, share, and connect?</span>
              <br />
              <span>Just log in and start talking!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
