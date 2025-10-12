import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function EditCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  const [editCourseFields, setEditCourseFields] = useState({ // course details
    courseTitle: course?.title || "",
    courseDescription: course?.description || "",
  });
  const [editFields, setEditFields] = useState({ // new lesson details
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
    setEditFields({
      title: "",
      description: "",
    });
  };

  const editCourseDetails = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `/api/courses/edit/${courseId}`,
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

  const editLesson = (e) => {
    e.preventDefault();
    console.log("Editing lesson...");
  }

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
        <h1>Lessons</h1>
        <br />
        <ul className="flex flex-col gap-2 cursor-pointer">
          {course?.lessons?.map((lesson, ind) => (
            <div className="flex" key={ind}>
              <li key={ind} className="grow border rounded p-2 mx-4">{lesson.title}</li>
              <button onClick={editLesson} key={ind+1000}>Edit</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
