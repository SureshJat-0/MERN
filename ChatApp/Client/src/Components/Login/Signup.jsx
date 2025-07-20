import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // signup
    axios
      .post(
        "/api/auth/signup",
        { username: signupInput, password: passwordInput },
        { withCredentials: true }
      )
      .then(() => {
        console.log("Signup successful!");
      })
      .catch((err) => {
        console.log(err);
      });
    setSignupInput("");
    setPasswordInput("");
    navigate("/");
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
            Already have an account? <Link to="/"> Login </Link>
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
            <span className="mb-1">Signup your</span>
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
