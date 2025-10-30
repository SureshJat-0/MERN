import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [studentCourses, setStudentCourses] = useState([]);
  const { user } = useAuth();
  const getStudentCourses = async () => {
    if (user.role !== "student") return console.log("Student only feature!");
    const res = await axios.get(`/api/course/student/${user.id}`, {
      withCredentials: true,
    });
    setStudentCourses(res.data);
  };
  useEffect(() => {
    getStudentCourses();
  }, []);

  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {studentCourses?.map((course, ind) => (
          <div className="bg-gray-800/40 p-4 rounded" key={ind}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{course.title}</div>
                <div className="text-sm text-gray-400">{"course.author"}</div>
              </div>
              <Link
                to={`/course/get/${course._id}`}
                data-link
                className="text-rose-400"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
