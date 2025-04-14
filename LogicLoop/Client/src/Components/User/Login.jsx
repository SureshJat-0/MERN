import { Link, useNavigate } from "react-router-dom";
import InputComp from "./InputComp";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  let [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  let [childInputReset, setChildInputReset] = useState(false);

  const sendData = (id, value) => {
    setChildInputReset(false);
    setUser((preValue) => ({ ...preValue, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/login', user);
      console.log("Login success");
      // Reset form fields
      setUser({
        username: "",
        password: "",
      });
      setChildInputReset(true);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center m-4">
      <div className="rounded-md p-4 backdrop-blur-md bg-white/30 border-white/30 shadow-xl">
        <h1 className="text-4xl text-center m-4">Login</h1>
        <form className="flex flex-col items-center">
          <InputComp
            title={"Username"}
            id={"username"}
            type={"text"}
            sendData={sendData}
            childInputReset={childInputReset}
          />
          <InputComp
            title={"Password"}
            id={"password"}
            type={"password"}
            sendData={sendData}
            childInputReset={childInputReset}
          />
          <button
            type="submit"
            className="bg-purple-500 rounded-md text-white px-4 py-2 m-2"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="text-center m-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-purple-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
