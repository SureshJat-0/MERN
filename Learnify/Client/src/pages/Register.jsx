import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

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
    <div className="flex flex-col gap-4">
      <h1>Register User</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={inputFields.name}
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />
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
      <input
        type="text"
        placeholder="Role"
        name="role"
        value={inputFields.role}
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />
      <button onClick={registerUser} className="cursor-pointer">
        Register
      </button>
    </div>
  );
}
