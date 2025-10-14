import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  const getAllCourses = async () => {
    const res = await axios.get("/api/courses/all", { withCredentials: true });
    setCourses(res.data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const joinCourse = async (e, course) => {
    e.preventDefault();
    const res = await axios.post("/api/courses/student/new", { courseId: course._id, studentId: user.id});
    console.log(res.data);
  }

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
          <Link to={`/courses/get/${course._id}`} key={ind} className="flex gap-2">
            <li
              className="p-2 border rounded my-2 grow"
              key={ind}
            >{`Title : ${course.title} -- Description : ${course.description}`}</li>
            <button onClick={(e) => joinCourse(e, course)} className="my-2">Join</button>
          </Link>
        ))}
      </ul>
    </div>
  );
}
