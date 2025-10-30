import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function CourseHeader() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState({});

  const getCourse = async (courseId) => {
    const res = await axios.get(`/api/course/get/${courseId}`, {
      withCredentials: true,
    });
    setCourse(res.data);
  };

  useEffect(() => {
    getCourse(courseId);
  }, []);

  const joinCourse = async (e, courseId) => {
    e.preventDefault();
    const res = await axios.post("/api/course/student/new", {
      courseId,
      studentId: user.id,
    });
    console.log(res.data);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
      <img
        src="https://fastly.picsum.photos/id/496/400/240.jpg?hmac=Vhi14lCXpW_i6i_J5-SceFlvQXUrKtt2_wG4ekNUyeE"
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold">{course?.title}</h2>
        <div className="text-sm text-gray-400 mt-1">
          By {course?.name || "Jone Doe"}
        </div>
        <p className="mt-4 text-gray-300">{course?.description}</p>
        <button
          onClick={(e) => joinCourse(e, courseId)}
          className="text-rose-500 hover:underline cursor-pointer mt-2"
        >
          Join Course +
        </button>
      </div>
    </div>
  );
}
