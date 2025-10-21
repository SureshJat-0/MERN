import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewLesson() {
  const { courseId } = useParams();
  const [newLessonFields, setNewLessonFields] = useState({
    title: "",
    description: "",
  });
  const addNewLesson = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/api/lesson/new",
      {
        courseId,
        title: newLessonFields.title,
        description: newLessonFields.description,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    setNewLessonFields({
      // -------------------------- Not working --------------------------
      title: "",
      description: "",
    });
  };
  return (
    <>
      <div className="max-w-2xl mx-auto my-8 bg-gray-800/40 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Lesson</h2>
        <form id="newCourseForm" className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            className="w-full bg-gray-900/40 rounded px-3 py-2"
            required
            value={newLessonFields.title}
            onChange={(e) =>
              setNewLessonFields({
                ...newLessonFields,
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
            required
            value={newLessonFields.description}
            onChange={(e) =>
              setNewLessonFields({
                ...newLessonFields,
                [e.target.name]: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-between">
            <button
              onClick={addNewLesson}
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
