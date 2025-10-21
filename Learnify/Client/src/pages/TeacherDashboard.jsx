import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function TeacherDashboard() {
  const [teacherCourses, setTeacherCourses] = useState([]);
  const { user } = useAuth();

  const getTeacherCourses = async () => {
    if (user.role !== "teacher") return console.log("Teacher only feature!");
    const res = await axios.get(`/api/courses/teacher/${user.id}`, {
      withCredentials: true,
    });
    setTeacherCourses(res.data);
  };

  useEffect(() => {
    getTeacherCourses();
  }, []);

  return (
    <>
      {/* <Link
              to={`/courses/edit/${course._id}`}
              key={ind + 1000}
              className="border rounded p-2"
            >
              Edit
            </Link> */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8 px-20">
        <aside className="lg:col-span-1 bg-gray-800/40 p-4 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-rose-600/40 flex items-center justify-center">
              T
            </div>
            <div>
              <div className="font-semibold">{"Teacher"}</div>
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
              to="/courses/new"
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

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Instructor Studio</h2>
            <Link to="/courses/new" data-link className="text-rose-400">
              New course
            </Link>
          </div>
          <div className="bg-gray-800/40 p-4 rounded mb-4">
            <h3 className="font-semibold">Your courses</h3>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {teacherCourses.map((course, ind) => (
                <div className="p-3 bg-gray-900/30 rounded" key={ind}>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-400">
                    {course.lessons.length} lessons
                  </div>
                  <div className="flex gap-4">
                  <Link
                    to={`/courses/get/${course._id}`}
                    data-link
                    className="text-rose-400 text-sm"
                  >
                    Open
                  </Link>
                  <Link
                    to={`/courses/edit/${course._id}`}
                    data-link
                    className="text-rose-400 text-sm"
                  >
                    Edit
                  </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
