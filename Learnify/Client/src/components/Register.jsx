import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();

  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    await register(inputFields);
    setInputFields({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div className="max-w-md mx-auto my-8 bg-gray-800/40 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create account</h2>
      <form id="registerForm" className="space-y-4">
        <input
          value={inputFields.name}
          onChange={(e) =>
            setInputFields({ ...inputFields, [e.target.name]: e.target.value })
          }
          name="name"
          placeholder="Full name"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
        />
        <input
          value={inputFields.email}
          onChange={(e) =>
            setInputFields({ ...inputFields, [e.target.name]: e.target.value })
          }
          name="email"
          placeholder="Email"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
        />
        <input
          value={inputFields.password}
          onChange={(e) =>
            setInputFields({ ...inputFields, [e.target.name]: e.target.value })
          }
          name="password"
          type="password"
          placeholder="Password"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
        />
        <div className="flex items-center justify-between">
          <button
            onClick={registerUser}
            type="submit"
            className="bg-rose-600 px-4 py-2 rounded cursor-pointer"
          >
            Sign up
          </button>
          <Link to="/login" data-link className="text-sm text-gray-400">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
