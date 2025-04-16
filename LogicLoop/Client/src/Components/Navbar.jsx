import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      console.log("Logout success");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-between px-8 py-4 bg-gray-400/10">
      <div className="">
        <ul className="flex items-center box-border">
          <Link
            to="/"
            className="text-4xl mx-4 px-2 py-1 cursor-pointer font-bold text-purple-900"
          >
            LogicLoop
          </Link>
          <Link
            to="/"
            className="text-lg mx-2 my-1 px-2 py-1 cursor-pointer hover:border-b-2 border-black transition-all ease-in"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-lg mx-2 my-1 px-2 py-1 cursor-pointer hover:border-b-2 border-black transition-all ease-in box-border"
          >
            Explore
          </Link>

          <div className="group relative text-lg cursor-pointer">
            <button>
              Games <i className="fa fa-caret-down"></i>
            </button>
            <div className="hidden px-4 group-hover:block absolute group-hover:bg-gray-400/10">
              <Link to="/explore/quiz" className="block px-2 py-1">
                Quiz
              </Link>
              <Link to="/explore/memory" className="block px-2 py-1">
                Memory
              </Link>
            </div>
          </div>

          <Link
            to="/history"
            className="text-lg mx-2 my-1 px-2 py-1 cursor-pointer hover:border-b-2 border-black transition-all ease-in box-border"
          >
            History
          </Link>
        </ul>
      </div>
      <div className="">
        <ul className="flex items-center">
          {user ? (
            <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer rounded-lg bg-purple-100 text-purple-800 shadow-lg">
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer rounded-lg bg-purple-100 text-purple-800 shadow-lg">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer rounded-lg bg-purple-500 text-white shadow-lg">
                <Link to="/login">Login</Link>
              </li>{" "}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
