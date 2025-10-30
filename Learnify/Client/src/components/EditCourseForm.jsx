import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditCourseForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [courseEditDetails, setCourseEditDetails] = useState({
    title: "",
    description: "",
  });

  const getCourse = async (courseId) => {
    const res = await axios.get(`/api/course/get/${courseId}`, {
      withCredentials: true,
    });
    setCourse(res.data);
  };

  useEffect(() => {
    getCourse(courseId);
  }, []);

  const editCourseDetails = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      "/api/course/edit",
      {
        courseId,
        title: courseEditDetails.title,
        description: courseEditDetails.description,
      },
      { withCredentials: true }
    );
    setCourseEditDetails({
      title: "",
      description: "",
    });
    console.log(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-gray-800/40 p-6 rounded-lg">
      <h3 className="font-semibold mb-4">
        Edit Course Details : {course?.title}
      </h3>
      <form id="newCourseForm" className="space-y-4">
        <input
          name="title"
          placeholder="New Title"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
          required
          value={courseEditDetails.title}
          onChange={(e) =>
            setCourseEditDetails({
              ...courseEditDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          type="description"
          rows={6}
          placeholder="New Description"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
          required
          value={courseEditDetails.description}
          onChange={(e) =>
            setCourseEditDetails({
              ...courseEditDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        <div className="flex items-center justify-between">
          <button
            onClick={editCourseDetails}
            type="submit"
            className="bg-rose-600 px-4 py-2 rounded cursor-pointer"
          >
            Save Edit
          </button>
        </div>
      </form>
    </div>
  );
}
