import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    await login(inputFields);
    setInputFields({
      email: "",
      password: "",
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-gray-800/40 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <form id="loginForm" className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
          value={inputFields.email}
          onChange={(e) =>
            setInputFields({ ...inputFields, [e.target.name]: e.target.value })
          }
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
          value={inputFields.password}
          onChange={(e) =>
            setInputFields({ ...inputFields, [e.target.name]: e.target.value })
          }
        />
        <div className="flex items-center justify-between">
          <button
            onClick={loginUser}
            type="submit"
            className="bg-rose-600 px-4 py-2 rounded cursor-pointer"
          >
            Sign in
          </button>
          <Link to="/register" data-link className="text-sm text-gray-400">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
