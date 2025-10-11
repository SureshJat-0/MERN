import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewCourse() {
  const [courseFields, setCourseFields] = useState({
    title: "",
    description: "",
  });

  const addCourse = async () => {
    const res = await axios.post("/api/courses/new", courseFields, {
      withCredentials: true,
    });
    console.log(res.data);
  };

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
      <h1>New Course</h1>
      <div>
        <input
          type="text"
          name="title"
          value={courseFields.title}
          onChange={(e) =>
            setCourseFields({
              ...courseFields,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="Title..."
        />
        <input
          type="text"
          name="description"
          value={courseFields.description}
          onChange={(e) =>
            setCourseFields({
              ...courseFields,
              [e.target.name]: e.target.value,
            })
          }
          placeholder="Description..."
        />
        <button onClick={addCourse}>Add Course</button>
      </div>
    </div>
  );
}
