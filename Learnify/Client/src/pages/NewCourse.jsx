import axios from "axios";
import { useState } from "react";

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
    setCourseFields({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto my-8 bg-gray-800/40 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">New Course</h2>
        <form id="newCourseForm" className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            className="w-full bg-gray-900/40 rounded px-3 py-2"
            value={courseFields.title}
            onChange={(e) =>
              setCourseFields({
                ...courseFields,
                [e.target.name]: e.target.value,
              })
            }
          />
          <textarea
            name="description"
            type="description"
            rows={6}
            placeholder="Description"
            className="w-full bg-gray-900/40 rounded px-3 py-2"
            onChange={(e) =>
              setCourseFields({
                ...courseFields,
                [e.target.name]: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-between">
            <button
              onClick={addCourse}
              type="submit"
              className="bg-rose-600 px-4 py-2 rounded cursor-pointer"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
