import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseHeader() {
  const { courseId } = useParams();
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
  
  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
      <img
        src="https://fastly.picsum.photos/id/496/400/240.jpg?hmac=Vhi14lCXpW_i6i_J5-SceFlvQXUrKtt2_wG4ekNUyeE"
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold">{course?.title}</h2>
        <div className="text-sm text-gray-400 mt-1">
          By {course?.author || "Jone Doe"}
        </div>
        <p className="mt-4 text-gray-300">{course?.description}</p>
      </div>
    </div>
  );
}
