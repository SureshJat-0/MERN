import axios from "axios";
import { useState } from "react";

export default function NewCourse() {
  const [courseFields, setCourseFields] = useState({
    title: "",
    description: "",
  });

  const addCourse = async () => {
    const res = await axios.post("/api/course/new", courseFields, {
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
      <div className="lg:col-span-3 ">
        <h2 className="text-2xl font-bold mb-4">New Course</h2>
        <form id="newCourseForm" className="space-y-4 max-w-2xl bg-gray-800/40 p-6 rounded-lg">
        <h3 className="font-semibold">Create new course</h3>
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
