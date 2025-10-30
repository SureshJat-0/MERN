import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseAside() {
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
    <>
      <aside className="space-y-4">
        <div className="bg-gray-800/50 p-4 rounded-md">
          <div className="text-sm text-gray-400">Course info</div>
          <div className="mt-3 text-sm">
            Total lessons:{" "}
            <span className="font-medium">{course?.lessons?.length}</span>
          </div>
          <span className="text-gray-400 text-sm my-2">Recommended</span>
        </div>
      </aside>
    </>
  );
}
