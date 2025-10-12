import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CoursePage() {
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
    <div>
      <h1>{course?.title}</h1>
      <h2>{course?.description}</h2>
      <br />
      <br />
      <h1>Lessons</h1>
      <ul>
        {course?.lessons?.map((lesson, ind) => (
          <li key={ind} className="my-4">
            <span>Title : {lesson.title}</span>
            <br />
            <span>Description : {lesson.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
