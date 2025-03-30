import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Login({ checkAuth, handleSetUser }) {
  let [input, setInput] = useState({
    username: "",
    password: "",
  });

  // flash messages
  let [infoMsg, setInfoMsg] = useState("");
  let [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/login", input, { withCredentials: true })
      .then((res) => {
        console.log("User Logged In");
        navigate("/");
        handleSetUser(res.data.user);
        checkAuth();
      })
      .catch((err) => {
        console.log("Invalid credentials");
        getFlashMsg();
      });
    // reseting input fields
    setInput({
      username: "",
      password: "",
    });
  };
  
  useEffect(() => {
    getFlashMsg();
  }, []);

  const getFlashMsg = async () => {
    let res = await axios.get("/api/flash/show");
    setInfoMsg(res.data.info[0]);
    setErrorMsg(res.data.error[0]);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center text-white">
        <Navbar />

        <div className="w-[70vw] flex flex-col justify-center items-center pt-12">
          {/* flash messages  */}
          {infoMsg && (
            <p className="border rounded-lg border-blue-600 bg-blue-950 px-4 py-2 mb-4 text-blue-300">
              {infoMsg}
            </p>
          )}
          {errorMsg && (
            <p className="border rounded-lg border-red-600 bg-red-950 px-4 py-2 mb-4 text-red-300">
              {errorMsg}
            </p>
          )}
          <br />
          <form className="rounded-2xl pb-8 px-8 border">
            <h2 className="text-4xl py-4 my-4 text-center">Login</h2>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
