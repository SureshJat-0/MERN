import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/User";
import axios, { all } from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import SideImagePage from "./SideImagePage";
import { useSnackbar } from "../../context/Snackbar";

export default function Login() {
  const { setUsers, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // login
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { username: loginInput, password: passwordInput },
        { withCredentials: true }
      );
      // setting login user
      const loginUserRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/status`,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(loginUserRes.data.user);
      // setting users
      const allUsersRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(allUsersRes.data);
      // UI update
      setLoginInput("");
      setPasswordInput("");
      navigate("/");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Login Error!";
      console.log(errMsg);
      setLoginInput("");
      setPasswordInput("");
      return showSnackbar(errMsg);
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
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-800">
                {" "}
                Signup{" "}
              </Link>
            </p>
          </Box>
        </div>
        <SideImagePage pageName={"Login"} />
      </div>
    </div>
  );
}
