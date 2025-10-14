import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  const [editCourseFields, setEditCourseFields] = useState({
    // course details
    courseTitle: "",
    courseDescription: "",
  });
  const [editFields, setEditFields] = useState({
    // new lesson details
    title: "",
    description: "",
  });

  const getCourse = async (courseId) => {
    const res = await axios.get(`/api/courses/get/${courseId}`, {
      withCredentials: true,
    });
    setCourse(res.data);
  };

  useEffect(() => {
    getCourse(courseId);
  }, []);

  const addNewLesson = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "/api/lesson/new",
      {
        courseId,
        title: editFields.title,
        description: editFields.description,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    setEditFields({
      // -------------------------- Not working --------------------------
      title: "",
      description: "",
    });
  };

  const editCourseDetails = async (e) => {
    e.preventDefault();
    console.log(courseId);
    const res = await axios.put(
      "/api/courses/edit",
      {
        courseId,
        title: editCourseFields.courseTitle,
        description: editCourseFields.courseDescription,
      },
      { withCredentials: true }
    );
    setEditCourseFields({
      courseTitle: "",
      courseDescription: "",
    });
    console.log(res.data);
  };

  const [newLessonFields, setNewLessonFields] = useState({
    title: "",
    description: "",
  });
  const [lesson, setLesson] = useState({});
  const editLessonRef = useRef(null);

  // ------------ Not working --------------
  const editLesson = async (e) => {
    e.preventDefault();
    console.log(lesson._id);
    const res = await axios.put(
      "/api/lesson/edit",
      {
        lessonId: lesson._id,
        title: lesson.title,
        description: lesson.description,
      },
      { withCredentials: true }
    );
    console.log(lesson);
    console.log(res.data);
    setLesson({});
  };

  return (
    <div className="">
      <h2>Edit Course Details : {courseId}</h2>
      <div>
        <input
          name="courseTitle"
          type="text"
          placeholder="New Course title..."
          value={editCourseFields.courseTitle}
          required
          onChange={(e) =>
            setEditCourseFields({
              ...editCourseFields,
              [e.target.name]: e.target.value,
            })
          }
        />
        <input
          name="courseDescription"
          type="text"
          placeholder="New Course description..."
          value={editCourseFields.courseDescription}
          required
          onChange={(e) =>
            setEditCourseFields({
              ...editCourseFields,
              [e.target.name]: e.target.value,
            })
          }
        />
        <button onClick={editCourseDetails}>Edit Course</button>
      </div>

      <br />
      <br />

      <h1>Add Lesson</h1>
      <div className="">
        <input
          name="title"
          type="text"
          placeholder="Lesson title..."
          value={editFields.name}
          required
          onChange={(e) =>
            setEditFields({ ...editFields, [e.target.name]: e.target.value })
          }
        />
        <input
          name="description"
          type="text"
          placeholder="Lesson description..."
          value={editFields.name}
          required
          onChange={(e) =>
            setEditFields({ ...editFields, [e.target.name]: e.target.value })
          }
        />
        <button onClick={addNewLesson}>Add Lesson</button>
      </div>
      <br />
      <br />
      <div className="">
        {/* Edit lesson  */}
        <div className="hidden" ref={editLessonRef}>
          <h1>Edit Lesson</h1>
          <input
            name="title"
            type="text"
            placeholder="Lesson description..."
            value={newLessonFields.name}
            required
            onChange={(e) =>
              setNewLessonFields({
                ...newLessonFields,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            name="description"
            type="text"
            placeholder="Lesson description..."
            value={newLessonFields.name}
            required
            onChange={(e) =>
              setNewLessonFields({
                ...newLessonFields,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button onClick={(e) => editLesson(e)}>Save Edit</button>
        </div>

        <br />
        <br />

        <h1>Lessons</h1>
        <br />
        <ul className="flex flex-col gap-2 cursor-pointer">
          {course?.lessons?.map((lesson, ind) => (
            <div className="flex" key={ind}>
              <li key={ind} className="grow border rounded p-2 mx-4">
                {lesson.title}
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editLessonRef.current.className = "block";
                  setLesson(lesson);
                }}
                key={ind + 1000}
              >
                Open Form
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
