import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // signup
    axios.post('/api/auth/signup', {username: signupInput, password: passwordInput}, {withCredentials: true}).then(() => {
      console.log('Signup successful!');
    }).catch((err) => {
      console.log(err);
    })
    setSignupInput("");
    setPasswordInput("");
    navigate("/");
  };
  return (
    <>
      <h1 className="text-xl m-4 text-center">Signup Form</h1>
      <form onSubmit={handleSignupSubmit} className="m-4 text-center">
        <input
          value={signupInput}
          onChange={(e) => setSignupInput(e.target.value)}
          type="text"
          placeholder="Username..."
        />
        <br />
        <br />
        <input
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          type="text"
          placeholder="Password..."
        />
        <br />
        <br />
        <button type="submit" className="border px-2 py-1 cursor-pointer">
          Signup
        </button>
      </form>
    </>
  );
}
