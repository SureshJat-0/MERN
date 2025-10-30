import { Link } from "react-router-dom";

export default function TeacherDashboardAside({ user }) {
  return (
    <>
      <aside className="lg:col-span-1 bg-gray-800/40 p-4 rounded-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded bg-rose-600/40 flex items-center justify-center">
            T
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-400">Teacher</div>
          </div>
        </div>
        <nav className="mt-6 space-y-2 text-sm">
          <Link
            to="/dashboard/teacher"
            data-link
            className="block px-2 py-1 rounded hover:bg-gray-700/30"
          >
            My courses
          </Link>
          <Link
            to="/dashboard/teacher/course/new"
            data-link
            className="block px-2 py-1 rounded hover:bg-gray-700/30"
          >
            Create course
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
    </>
  );
}
