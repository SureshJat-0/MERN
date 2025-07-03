import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log('btn clicked')
    if (
      !fields.username.trim() ||
      !fields.email.trim() ||
      !fields.password.trim()
    ) {
      return;
    }
    console.log(fields);
    try {
      await axios.post("/api/auth/signup", fields, { withCredentials: true });
      setFields({ username: "", email: "", password: "" });
    } catch (err) {
      console.error("Signup error:", err.response?.data?.error);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSignupSubmit}>
        <div className="flex justify-between my-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="username" className="text-xl my-1">
              Username:{" "}
            </label>
            <label htmlFor="email" className="text-xl my-1">
              Email:{" "}
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
              id="email"
              name="email"
              type="text"
              value={fields.email}
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
          <p className="mb-3">Already have and account? <span className="cursor-pointer"><Link to='/login'>Login</Link></span></p>
          <button type="submit" disabled={!fields.username.trim() || !fields.email.trim() || !fields.password.trim()} className="disabled:!cursor-not-allowed">Signup</button>
        </div>
      </form>
    </>
  );
}
