import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="bg-gray-800/70 backdrop-blur sticky top-0 z-40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              id="menuBtn"
              className="p-2 rounded-md hover:bg-gray-700/40"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-3" data-link>
              <div className="w-10 h-10 bg-rose-500 rounded-md flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
              <span className="font-semibold text-lg hidden sm:inline">
                Learnify
              </span>
            </Link>
          </div>

          <div className="flex-1 mx-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                id="search"
                placeholder="Search courses, lessons..."
                className="w-full bg-gray-800/60 placeholder-gray-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-700/30">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-2">
              {(user.role === "teacher" && (
                <Link
                  to="/dashboard/teacher"
                  data-link
                  className="px-3 py-2 rounded hover:bg-gray-700/30"
                >
                  Dashboard
                </Link>
              )) || (
                <Link
                  to="/dashboard/student"
                  data-link
                  className="px-3 py-2 rounded hover:bg-gray-700/30"
                >
                  Dashboard
                </Link>
              )}
            </nav>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                data-link
                className="text-sm px-3 py-2 rounded bg-rose-600 hover:bg-rose-500"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                data-link
                className="text-sm px-3 py-2 rounded border border-gray-700"
              >
                Sign up
              </Link>
              <button
                id="avatarBtn"
                className="w-9 h-9 rounded-full bg-gray-700/40 flex items-center justify-center text-sm"
              >
                S
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
