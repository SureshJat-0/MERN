import axios from "axios";
import { useRef, useState } from "react";

export default function EditLessonForm() {
  const [lesson, setLesson] = useState({});
  const editLessonRef = useRef(null);
  const [editLessonFields, setEditLessonFields] = useState({
    title: "",
    description: "",
  });

  const getLesson = async (lessonId) => {
    const lessonRes = await axios.get(`/api/lesson/get/${lessonId}`, {
      withCredentials: true,
    });
    setLesson(lessonRes.data);
  };

  const editLesson = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      "/api/lesson/edit",
      {
        lessonId: lesson._id,
        title: editLessonFields.title,
        description: editLessonFields.description,
      },
      { withCredentials: true }
    );
    setEditLessonFields({
      title: "",
      description: "",
    });
    setLesson({});
    console.log(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-gray-800/40 p-6 rounded-lg hidden" ref={editLessonRef}>
      <h3 className="font-semibold mb-4">Edit Lesson</h3>
      <form id="newCourseForm" className="space-y-4">
        <input
          name="title"
          placeholder="New Title"
          className="w-full bg-gray-900/40 rounded px-3 py-2"
          required
          value={editLessonFields.title}
          onChange={(e) =>
            setEditLessonFields({
              ...editLessonFields,
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
          value={editLessonFields.description}
          onChange={(e) =>
            setEditLessonFields({
              ...editLessonFields,
              [e.target.name]: e.target.value,
            })
          }
        />
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => editLesson(e)}
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
