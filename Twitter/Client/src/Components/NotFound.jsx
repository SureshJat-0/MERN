import Navbar from "./Navbar";
import Aside from "./Aside";
import { Link } from "react-router-dom";

export default function NotFound({ user }) {
  return (
    <div className="flex flex-wrap justify-end text-white mx-24">
      <Navbar user={user} />
      <div className="flex flex-col justify-start items-center m-20">
        <h1 className="text-4xl font-bold p-2">404 - Page Not Found</h1>
        <p className="text-xl">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-400 p-2">
          Go Back Home
        </Link>
      </div>
      <Aside />
    </div>
  );
}
