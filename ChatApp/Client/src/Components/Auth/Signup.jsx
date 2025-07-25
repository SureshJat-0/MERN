import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import SideImagePage from "./SideImagePage";
import { useSnackbar } from "../../context/Snackbar";

export default function Login() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [signupInput, setSignupInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // signup
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        { username: signupInput, password: passwordInput },
        { withCredentials: true }
      );
      console.log("User signup Successfully!");
      setSignupInput("");
      setPasswordInput("");
      navigate("/signin");
    } catch (err) {
      const errorMsg = err.response.data.message;
      console.log(errorMsg);
      setSignupInput("");
      setPasswordInput("");
      return showSnackbar(errorMsg);
    }
  };
  return (
    <div className="flex">
      <Navbar />
      <div className="flex w-screen h-screen">
        <div className="w-[48vw] h-screen flex justify-center">
          <Box
            onSubmit={handleSignupSubmit}
            className="mt-8 w-[50%] felx flex-col"
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <h1 className="text-4xl font-bold text-center">Signup</h1>
            <TextField
              id="outlined-basic"
              label="Username"
              type="text"
              variant="outlined"
              value={signupInput}
              onChange={(e) => setSignupInput(e.target.value)}
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
              Signup
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-800">
                {" "}
                Login{" "}
              </Link>
            </p>
          </Box>
        </div>
        <SideImagePage pageName={"Signup"} />
      </div>
    </div>
  );
}
