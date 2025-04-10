import { Link } from "react-router-dom";

export default function Navbar() {
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
        </ul>
      </div>
      <div className="">
        <ul className="flex items-center">
          <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer rounded-lg bg-purple-100 text-purple-800 shadow-lg">
            SignUp
          </li>
          <li className="text-lg mx-2 my-1 px-4 py-1 cursor-pointer rounded-lg bg-purple-500 text-white shadow-lg">
            Login
          </li>
        </ul>
      </div>
    </div>
  );
}
