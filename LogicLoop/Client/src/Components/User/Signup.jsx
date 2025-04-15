import { Link, useNavigate } from "react-router-dom";
import InputComp from "./InputComp";
import { useState } from "react";
import axios from "axios";

export default function Signup({ setParentUser }) {
  let [user, setUser] = useState({
    username: "",
    fullname: "",
    password: "",
  });

  let [childInputReset, setChildInputReset] = useState(false);

  const sendData = (id, value) => {
    setChildInputReset(false);
    setUser((preValue) => ({ ...preValue, [id]: value }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate user input
      if (!user.username || !user.fullname || !user.password) {
        alert("Please fill in all fields");
        return;
      }
      const res = await axios.post("/api/auth/signup", user);
      console.log("Signup success:", res.data);
      // Reset form fields
      setUser({
        username: "",
        fullname: "",
        password: "",
      });
      setParentUser(user);
      setChildInputReset(true);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center m-4">
      <div className="rounded-md p-4 backdrop-blur-md bg-white/30 border-white/30 shadow-xl">
        <h1 className="text-4xl text-center m-4">Signup</h1>
        <form className="flex flex-col items-center">
          <InputComp
            title={"Username"}
            id={"username"}
            type={"text"}
            sendData={sendData}
            childInputReset={childInputReset}
          />
          <InputComp
            title={"Fullname"}
            id={"fullname"}
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
            Signup
          </button>
        </form>
        <p className="text-center m-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
