import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/socket";
import { useUser } from "../context/User";

export default function Login() {
  const { setCurrentUser } = useUser();
  const socket = useSocket();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: loginInput,
      socketId: socket.id,
    };
    socket.emit("joinServer", user);
    setCurrentUser(user);
    setLoginInput("");
    navigate("/chat");
  };
  return (
    <>
      <h1 className="text-xl m-4">login form</h1>
      <form onSubmit={handleLoginSubmit} className="m-4">
        <input
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          type="text"
          placeholder="Username..."
        />
        <button type="submit" className="border px-2 py-1 cursor-pointer">
          Login
        </button>
      </form>
    </>
  );
}
