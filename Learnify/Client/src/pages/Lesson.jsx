import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Lesson() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState({});

  const getLesson = async () => {
    const lessonRes = await axios.get(`/api/lesson/get/${lessonId}`, {
      withCredentials: true,
    });
    if (!lessonRes) return "No response";
    setLesson(lessonRes.data);
  };

  useEffect(() => {
    getLesson();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 mx-20">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center">
            <div className="text-gray-400">Video Player Placeholder</div>
          </div>
          <div className="mt-4 bg-gray-800/40 p-4 rounded-md">
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            {/* <div className="text-sm text-gray-400 mt-1">{lesson.duration} • {lesson.courseTitle}</div> */}
            <div className="text-sm text-gray-400 mt-1">
              {"10m"} • {lesson.title}
            </div>
            {/* <p className="mt-3 text-gray-300">${lesson.content}</p> */}
            <p className="mt-3 text-gray-300">This is course content.</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-md">
            <div className="text-sm text-gray-400">Course</div>
            {/* <a href="#/course/${lesson.courseId}" data-link className="block mt-2 text-rose-400">{lesson.courseTitle}</a> */}
            <a
              href="#/course/${lesson.courseId}"
              data-link
              className="block mt-2 text-rose-400"
            >
              {lesson.title}
            </a>
            <div className="mt-4 text-sm text-gray-400">Other lessons</div>
            {/* <div className="mt-2 space-y-2">
                  ${findCourseById(lesson.courseId).lessons.map(l=>`<a href="#/lesson/${l.id}" data-link className="block text-sm hover:underline">${l.title}</a>`).join('')}
                </div> */}
          </div>
        </aside>
      </div>
    </>
  );
}
