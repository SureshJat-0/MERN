import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('login...');
    try {
      await axios.post('/api/auth/login', fields, {withCredentials: true});
      console.log('in...')
      setFields({username: '', password: ''});
    } catch(err) {
      console.log("Login error:", err.response?.data?.error);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="flex justify-between my-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="username" className="text-xl my-1">
              Username:{" "}
            </label>
            <label htmlFor="password" className="text-xl my-1">
              Password:{" "}
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <input
              id="username"
              name="username"
              type="text"
              value={fields.username}
              onChange={(e) =>
                setFields({ ...fields, [e.target.name]: e.target.value })
              }
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
            <input
              id="password"
              name="password"
              type="password"
              value={fields.password}
              onChange={(e) =>
                setFields({ ...fields, [e.target.name]: e.target.value })
              }
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
          </div>
        </div>
        <div className="m-2">
          <p className="mb-3">Don't have and account? <span className="cursor-pointer"><Link to='/signup'>Signup</Link></span></p>
          <button type="submit" disabled={!fields.username.trim() || !fields.password.trim()} className="disabled:!cursor-not-allowed">Login</button>
        </div>
      </form>
    </>
  );
}
