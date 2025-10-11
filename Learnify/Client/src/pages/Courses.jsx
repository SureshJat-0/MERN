import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    const res = await axios.get("/api/courses/all", { withCredentials: true });
    setCourses(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="">
      <div className="flex gap-8">
        <Link to="/">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard/teacher">Teacher Dashboard</Link>
        <Link to="/dashboard/student">Student Dashboard</Link>
        <Link to="/courses/new">New Course</Link>
      </div>
      <br />
      <br />
      <h1>All Courses</h1>
      <ul>
        {courses.map((course, ind) => (
          <li
            key={ind}
          >{`Title : ${course.title} -- Description : ${course.description}`}</li>
        ))}
      </ul>
    </div>
  );
}
