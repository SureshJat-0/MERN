import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import TeacherDashboardAside from "./TeacherDashboardAside";

export default function TeacherDashboard() {
  const [teacherCourses, setTeacherCourses] = useState([]);
  const { user } = useAuth();

  const getTeacherCourses = async () => {
    if (user.role !== "teacher") return console.log("Teacher only feature!");
    const res = await axios.get(`/api/course/teacher/${user.id}`, {
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8 sm:px-12 lg:px-20 py-8">
        <TeacherDashboardAside />
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Instructor Studio</h2>
            <Link to="/dashboard/teacher/course/new" data-link className="text-rose-400">
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
                    to={`/course/get/${course._id}`}
                    data-link
                    className="text-rose-400 text-sm"
                  >
                    Open
                  </Link>
                  <Link
                    to={`/dashboard/teacher/course/edit/${course._id}`}
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
