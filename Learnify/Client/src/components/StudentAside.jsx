import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function StudentAside() {
  const { user } = useAuth();
  return (
    <aside className="lg:col-span-1 bg-gray-800/40 p-4 rounded-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded bg-gray-700/50 flex items-center justify-center">
          {user?.name[0] || "S"}
        </div>
        <div>
          <div className="font-semibold">{user?.name}</div>
          <div className="text-sm text-gray-400">Student</div>
        </div>
      </div>
      <nav className="mt-6 space-y-2 text-sm">
        <Link
          to="/dashboard/student"
          data-link
          className="block px-2 py-1 rounded hover:bg-gray-700/30"
        >
          My courses
        </Link>
        <Link
          to="/"
          data-link
          className="block px-2 py-1 rounded hover:bg-gray-700/30"
        >
          Browse
        </Link>
        <Link
          to="/"
          data-link
          className="block px-2 py-1 rounded hover:bg-gray-700/30"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
