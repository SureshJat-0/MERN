import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <div className="w-52 h-screen py-2 px-4 text-xl flex fixed top-0 left-20">
      <ul>
        <li className="my-6">
          <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
            <Link to={"/"}>
              <i className="fa-brands fa-x-twitter pe-4"></i>{" "}
            </Link>
          </span>
        </li>
        <li className="my-6">
          <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
            <Link to={"/"}>
              <i className="fa-solid fa-house pe-4"></i> Home
            </Link>
          </span>
        </li>
        <li className="my-6">
          <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
            <Link to={"/profile"}>
              <i className="fa-regular fa-user pe-4"></i> Profile{" "}
            </Link>
          </span>
        </li>
        {!user && (
          <li className="my-6">
            <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
              <Link to={"/signup"}>
                <i className="fa-solid fa-user-plus pe-4"></i>SignUP
              </Link>
            </span>
          </li>
        )}
        {!user && (
          <li className="my-6">
            <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
              <Link to={"/login"}>
                <i className="fa-solid fa-right-to-bracket pe-4"></i> Login
              </Link>
            </span>
          </li>
        )}

        {user && (
          <li className="my-6">
            <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
              <Link to={"/logout"}>
                <i className="fa-solid fa-right-from-bracket pe-4"></i> Logout
              </Link>
            </span>
          </li>
        )}

        <li className="my-6">
          <span className="my-1 py-3 px-6 cursor-pointer rounded-full hover:bg-zinc-600">
            <i className="fa-solid fa-ellipsis pe-4"></i> More
          </span>
        </li>
      </ul>
    </div>
  );
}
