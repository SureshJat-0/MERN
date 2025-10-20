import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CourseBox from "../components/CourseBox";

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
    const res = await axios.post("/api/courses/student/new", {
      courseId: course._id,
      studentId: user.id,
    });
    console.log(res.data);
  };

  return (
    <div className="px-20 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">All Courses</h1>
        <div className="text-sm text-gray-400">
          {courses.length} courses
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course, ind) => (
          <CourseBox course={course} key={ind} />
        ))}
      </div>
    </div>
  );
}
