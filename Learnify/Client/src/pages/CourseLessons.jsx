import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseLessons() {
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
    <section className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Lessons</h3>
      <div className="space-y-3">
        {course?.lessons?.length === 0 && <h1>Zero Lesson</h1>}
        {course?.lessons?.map((lesson, ind) => (
          <Link
            to={`/lesson/get/${lesson._id}`}
            data-link
            key={ind}
            className="block bg-gray-800/40 rounded p-3 hover:bg-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{lesson?.title}</div>
                <div className="text-sm text-gray-400">
                  {lesson?.duration} • {course?.title}
                </div>
              </div>
              <div className="text-sm text-rose-400">Open</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
