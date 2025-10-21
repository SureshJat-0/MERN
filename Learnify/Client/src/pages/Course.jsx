import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  const getCourse = async (courseId) => {
    const res = await axios.get(`/api/courses/get/${courseId}`, {
      withCredentials: true,
    });
    setCourse(res.data);
  };

  useEffect(() => {
    getCourse(courseId);
  }, []);

  return (
    <div className="px-20 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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

          <section className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Lessons</h3>
            <div className="space-y-3">
              {course?.lessons?.map((lesson, ind) => (
                <Link
                  to={`/lessons/get/${lesson._id}`}
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
        </div>

        <aside className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md">
            <div className="text-sm text-gray-400">Course info</div>
            <div className="mt-3 text-sm">
              Total lessons:{" "}
              <span className="font-medium">{course?.lessons?.length}</span>
            </div>
            <Link
              to={`/lessons/new/${course._id}`}
              data-link
              className="mt-4 inline-block text-center w-full bg-rose-600 hover:bg-rose-500 text-white py-2 rounded"
            >
              Add Lesson
            </Link>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-md text-sm text-gray-400">
            Recommended
          </div>
        </aside>
      </div>
    </div>
  );
}
