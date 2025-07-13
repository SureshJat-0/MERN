import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socket";
import { useUser } from "../../context/User";
import axios from 'axios';

export default function Login() {
  const { setCurrentUser } = useUser();
  const socket = useSocket();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasseordInput] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: loginInput,
      socketId: socket.id,
    };
    socket.emit("joinServer", user);
    setCurrentUser(user);
    // login 
    axios.post('/api/auth/login', {username: loginInput, password: passwordInput}, {withCredentials: true}).then(() => {
      console.log('login successful!');
    }).catch((err) => {
      console.log(err);
    });
    setLoginInput("");
    setPasseordInput('');
    navigate("/chat");
  };
  return (
    <>
      <h1 className="text-xl m-4 text-center">login form</h1>
      <form onSubmit={handleLoginSubmit} className="m-4 text-center">
        <input
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          type="text"
          placeholder="Username..."
        />
        <br />
        <br />
        <input
          value={passwordInput}
          onChange={(e) => setPasseordInput(e.target.value)}
          type="text"
          placeholder="Password..."
        />
        <br />
        <br />
        <button type="submit" className="border px-2 py-1 cursor-pointer">
          Login
        </button>
      </form>
    </>
  );
}
