import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function SignUp() {
  let [input, setInput] = useState({
    username: "",
    fullname: '',
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    await axios
      .post("/api/auth/signup", input)
      .then(() => {
        console.log("New User SignedUp");
      })
      .catch((err) => console.log("erro"));
    // reseting input fields
    setInput({
      username: "",
      fullname: '',
      password: "",
    });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center text-white">
              <Navbar />
      
              <div className="w-[70vw] flex justify-center items-start pt-12">
                <br />
                <form className="rounded-2xl pb-8 px-8 border">
                  <h2 className="text-4xl py-4 my-4 text-center">SignUP</h2>
                  <label htmlFor="" className="text-lg">
                    User Name :{" "}
                  </label>
                  <input
                  required
                    className="border rounded-lg py-2 px-4 outline-0 mx-4"
                    value={input.username}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    name="username"
                    type="text"
                    placeholder="User Name"
                  />
                  <br />
                  <br />
                  <label htmlFor="" className="text-lg">
                    Full Name :{" "}
                  </label>
                  <input
                  required
                    className="border rounded-lg py-2 px-4 outline-0 mx-4"
                    value={input.fullname}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                  />
                  <br />
                  <br />
                  <label htmlFor="" className="text-lg">
                    Password : &nbsp;{" "}
                  </label>
                  <input
                    className="border rounded-lg py-2 px-4 outline-0 mx-4"
                    value={input.password}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <br />
                  <br />
                  <div className="text-center">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="cursor-pointer border-1 rounded-lg px-4 py-2 hover:bg-white hover:text-black"
                    >
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
            </div>
    </>
  );
}
