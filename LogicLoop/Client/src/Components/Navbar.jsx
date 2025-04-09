import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar flex justify-between px-8 py-4 bg-slate-50">
      <div className="nav-left">
        <ul className="flex items-center">
          <Link
            to="/"
            className="text-4xl mx-4 px-2 py-1 cursor-pointer font-bold text-purple-900"
          >
            LogicLoop
          </Link>
          <Link to="/" className="text-lg mx-2 my-1 px-2 py-1 cursor-pointer">
            Home
          </Link>
          <Link
            to="/explore"
            className="text-lg mx-2 my-1 px-2 py-1 cursor-pointer"
          >
            Explore
          </Link>
        </ul>
      </div>
      <div className="nav-right">
        <ul className="flex items-center">
          <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer border rounded-lg bg-purple-100 text-purple-800">
            SignUp
          </li>
          <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer border rounded-lg bg-purple-500 text-white">
            Login
          </li>
        </ul>
      </div>
    </div>
  );
}
