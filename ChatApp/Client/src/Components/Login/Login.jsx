import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/User";
import axios, { all } from "axios";

export default function Login() {
  const { users, setUsers, currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasseordInput] = useState("");

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
      setPasseordInput("");
      navigate("/chat");
    } catch (err) {
      console.log("Login Error!");
    }
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
