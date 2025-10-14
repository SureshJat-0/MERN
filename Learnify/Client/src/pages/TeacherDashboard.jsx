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
    <div>
      <div className="flex gap-8">
        <Link to="/">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard/teacher">Teacher Dashboard</Link>
        <Link to="/dashboard/student">Student Dashboard</Link>
        <Link to="/courses/new">New Course</Link>
      </div>
      <br />
      <br />
      <h1>TeacherDashboard</h1>
      <br />
      <h1>Your Courses</h1>
      <br />
      <ul>
        {teacherCourses.map((course, ind) => (
          <div className="flex gap-4 items-center" key={ind}>
          <Link to={`/courses/get/${course._id}`} key={ind} className="grow">
            <li className="border rounded p-2 cursor-pointer" key={ind}>
              {`Title : ${course.title} -- Description : ${course.description}`}{" "}
            </li>
          </Link>
          <Link to={`/courses/edit/${course._id}`} key={ind+1000} className="border rounded p-2">Edit</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
