import Course from "../models/course.js";
import Lesson from "../models/lesson.js";

const postNewLesson = async (req, res) => {
  const { courseId, title, description } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.send({ message: "Invalid CourseId!" });
  const lesson = await Lesson.create({ title, description });
  // Adding lesson to the course
  course.lessons.push(lesson);
  await course.save();
  res.send({ lesson, message: "New lesson added!" });
};

// ------------- Not working ----------------
const editLesson = async (req, res) => {
  const { lessonId, title, description } = req.body;
  // const updatedLesson = { title, description };
  // const lesson = await Lesson.findByIdAndUpdate(
  //   lessonId,
  //   { $set: {title, description} },
  //   { new: true }
  // );
  const lesson = await Lesson.findById(lessonId);
  lesson.title = title;
  lesson.description = description;
  await lesson.save();
  console.log(lesson);
  if (!lesson) return res.send({ message: "Invalid lessonId!" });
  res.send({ message: "Lesson updated!", lesson });
};

export { postNewLesson, editLesson };
