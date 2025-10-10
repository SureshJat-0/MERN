import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="flex flex-col gap-4">
      <h1>Login User</h1>
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={inputFields.email}
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        value={inputFields.password}
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />
      <button onClick={loginUser} className="cursor-pointer">
        Login
      </button>
    </div>
  );
}
