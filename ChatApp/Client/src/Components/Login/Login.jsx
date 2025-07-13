import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/User";
import axios from "axios";

export default function Login() {
  const { users, setUsers, currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasseordInput] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    axios
      // login
      .post(
        "/api/auth/login",
        { username: loginInput, password: passwordInput },
        { withCredentials: true }
      )
      .then(() => {
        console.log("login successful!");
        return axios.get("/api/user/profile", { withCredentials: true });
      })
      // get current login user
      .then((res) => {
        setCurrentUser(res.data.user);
        return axios.get("/api/user/users", { withCredentials: true });
      })
      // seting users
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoginInput("");
    setPasseordInput("");
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
